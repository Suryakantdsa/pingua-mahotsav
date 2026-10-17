import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "surybsjnkanjb";

// Web Crypto HMAC SHA-256 verification (safe for Edge runtime)
function base64urlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function verifyJwt(token: string, secret: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, signatureB64] = parts;

    const encoder = new TextEncoder();
    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const keyData = encoder.encode(secret);

    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const signatureBin = base64urlDecode(signatureB64);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBin as any,
      data
    );

    if (!isValid) return null;

    const payloadStr = new TextDecoder().decode(base64urlDecode(payloadB64));
    const payload = JSON.parse(payloadStr);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const ALLOWED_ADMIN_ROLES = [
    "super_admin",
    "admin",
    "coordinator",
    "volunteer",
    "member",
  ];

  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    if (!accessToken) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyJwt(accessToken, JWT_SECRET);
    if (!payload || !ALLOWED_ADMIN_ROLES.includes(payload.role)) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
