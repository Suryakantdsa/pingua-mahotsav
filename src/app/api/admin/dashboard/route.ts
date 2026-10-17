import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Event from "@/models/Event";
import OrgMember from "@/models/OrgMember";
import WebCredit from "@/models/WebCredit";
import Sponsor from "@/models/Sponsor";
import BloodDonor from "@/models/BloodDonor";
import Participant from "@/models/Participant";
import HeroBanner from "@/models/HeroBanner";

export async function GET() {
  try {
    await dbConnect();

    const [
      eventsCount,
      orgMembersCount,
      webCreditsCount,
      sponsorsCount,
      bloodDonorsCount,
      participantsCount,
      heroBannersCount,
      recentEvents,
      recentBloodDonors,
      recentParticipants,
    ] = await Promise.all([
      Event.countDocuments(),
      OrgMember.countDocuments(),
      WebCredit.countDocuments(),
      Sponsor.countDocuments(),
      BloodDonor.countDocuments(),
      Participant.countDocuments(),
      HeroBanner.countDocuments(),
      Event.find().sort({ createdAt: -1 }).limit(5).lean(),
      BloodDonor.find().sort({ createdAt: -1 }).limit(5).lean(),
      Participant.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return NextResponse.json(
      {
        success: true,
        counts: {
          events: eventsCount,
          orgMembers: orgMembersCount,
          webCredits: webCreditsCount,
          sponsors: sponsorsCount,
          bloodDonors: bloodDonorsCount,
          participants: participantsCount,
          heroBanners: heroBannersCount,
        },
        recentEvents,
        recentBloodDonors,
        recentParticipants,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Dashboard API Error:", error);
    const msg = error instanceof Error ? error.message : "Failed to fetch dashboard metrics";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
