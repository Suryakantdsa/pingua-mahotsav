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
      .select("registrationNo name bloodGroup phone district createdAt")
      .lean();

    // Format the donors with relative time
    const formattedDonors = donors.map((donor) => ({
      registrationNo: donor.registrationNo,
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      district: donor.district || "Dhenkanal",
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

    if (!name || !bloodGroup || !phone) {
      return NextResponse.json(
        { error: "Name, Blood Group, and Contact Number are required." },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).trim();
    const cleanName = String(name).trim().toUpperCase();

    // Check if phone already registered
    const existingDonor = await BloodDonor.findOne({ phone: cleanPhone });
    if (existingDonor) {
      // Update existing record if new info provided
      existingDonor.name = cleanName;
      if (age) existingDonor.age = parseInt(String(age)) || existingDonor.age;
      if (bloodGroup) existingDonor.bloodGroup = bloodGroup;
      if (body.guardianName) existingDonor.guardianName = String(body.guardianName).toUpperCase();
      if (body.gender) existingDonor.gender = body.gender;
      if (body.dob) existingDonor.dob = body.dob;
      if (body.whatsappNumber) existingDonor.whatsappNumber = body.whatsappNumber;
      if (body.address) existingDonor.address = body.address;
      if (body.district) existingDonor.district = body.district;
      if (body.occupation) existingDonor.occupation = body.occupation;
      if (body.previousDonations !== undefined) existingDonor.previousDonations = String(body.previousDonations);
      if (body.lastDonationDate) existingDonor.lastDonationDate = body.lastDonationDate;
      if (body.weight) existingDonor.weight = String(body.weight);
      if (body.pledgeOrganDonation !== undefined) existingDonor.pledgeOrganDonation = Boolean(body.pledgeOrganDonation);
      if (body.signatureName) existingDonor.signatureName = body.signatureName;
      if (!existingDonor.registrationNo) {
        existingDonor.registrationNo = await generateRegNumber();
      }

      await existingDonor.save();

      return NextResponse.json(
        {
          message: "Registration updated successfully!",
          registrationNo: existingDonor.registrationNo,
          donor: existingDonor,
        },
        { status: 200 }
      );
    }

    // Generate unique sequential registration number
    const registrationNo = await generateRegNumber();

    const newDonor = new BloodDonor({
      registrationNo,
      name: cleanName,
      guardianName: body.guardianName ? String(body.guardianName).toUpperCase() : "",
      gender: body.gender || "Male",
      age: parseInt(String(age)) || 25,
      dob: body.dob || "",
      bloodGroup: bloodGroup,
      phone: cleanPhone,
      whatsappNumber: body.whatsappNumber || cleanPhone,
      address: body.address || "",
      district: body.district || "Dhenkanal",
      occupation: body.occupation || "",
      previousDonations: String(body.previousDonations || "0"),
      lastDonationDate: body.lastDonationDate || "",
      weight: String(body.weight || ""),
      pledgeOrganDonation: Boolean(body.pledgeOrganDonation),
      declarationAgreed: body.declarationAgreed !== undefined ? Boolean(body.declarationAgreed) : true,
      declarationDate: body.declarationDate || new Date().toLocaleDateString("en-GB"),
      signatureName: body.signatureName || cleanName,
      medicalStatus: "Registered",
      remarks: "Online Registration Verified",
      receivedBy: "Red Cross & Pingua Mahotsav Blood Camp Team",
    });

    await newDonor.save();

    return NextResponse.json(
      {
        message: "Thank you for registering to donate blood!",
        registrationNo,
        donor: newDonor,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blood donor:", error);
    return NextResponse.json(
      { error: "Failed to process blood donation registration" },
      { status: 500 }
    );
  }
}

async function generateRegNumber(): Promise<string> {
  const count = await BloodDonor.countDocuments();
  const nextSeq = 101 + count;
  return `PM-2026-BD-${String(nextSeq).padStart(4, "0")}`;
}

// Helper function to get relative time
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 172800) return "Yesterday";
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}
