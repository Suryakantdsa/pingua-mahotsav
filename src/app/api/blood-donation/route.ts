import { NextRequest, NextResponse } from "next/server";
import BloodDonor from "@/models/BloodDonor";
import dbConnect from "@/lib/mongoose";

export async function GET() {
  try {
    await dbConnect();

    // Get recent donors (last 50, sorted by latest first)
    const donors = await BloodDonor.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select("name bloodGroup createdAt")
      .lean();

    // Format the donors with relative time
    const formattedDonors = donors.map((donor) => ({
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      time: getRelativeTime(donor.createdAt),
      createdAt: donor.createdAt,
    }));

    return NextResponse.json({ donors: formattedDonors }, { status: 200 });
  } catch (error) {
    console.error("Error fetching donors:", error);
    return NextResponse.json(
      { error: "Failed to fetch donors" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate required fields
    const { name, age, bloodGroup, phone } = body;

    if (!name || !age || !bloodGroup || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if phone already exists
    const existingDonor = await BloodDonor.findOne({ phone });
    if (existingDonor) {
      return NextResponse.json(
        { error: "Phone number already registered" },
        { status: 400 }
      );
    }

    // Create new donor
    const newDonor = new BloodDonor({
      name,
      age: parseInt(age),
      bloodGroup,
      phone,
    });

    await newDonor.save();

    return NextResponse.json(
      {
        message: "Thank you for registering! We will contact you soon.",
        donor: {
          name: newDonor.name,
          bloodGroup: newDonor.bloodGroup,
          time: "Just now",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating donor:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to get relative time
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 172800) return "Yesterday";
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}
