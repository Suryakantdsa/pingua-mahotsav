import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "surybsjnkanjb";

function base64urlEncode(buffer: Buffer): string {
  return buffer
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function signJwt(
  payload: Record<string, unknown>,
  expiresInSeconds: number = 86400 * 7
): string {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp };

  const headerB64 = base64urlEncode(Buffer.from(JSON.stringify(header)));
  const payloadB64 = base64urlEncode(Buffer.from(JSON.stringify(fullPayload)));

  const data = `${headerB64}.${payloadB64}`;
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(data)
    .digest();

  const signatureB64 = base64urlEncode(signature);

  return `${headerB64}.${payloadB64}.${signatureB64}`;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHashOrPlain: string): boolean {
  if (!password || !storedHashOrPlain) return false;
  
  // If stored as salt:hash
  if (storedHashOrPlain.includes(":")) {
    const [salt, originalHash] = storedHashOrPlain.split(":");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === originalHash;
  }
  
  // Fallback for legacy database records
  return password === storedHashOrPlain;
}
