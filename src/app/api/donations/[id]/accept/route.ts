// app/api/donations/[id]/accept/route.ts
import dbConnect from "@/app/api/lib/dbConnect";
import DonateFood from "@/app/api/models/DonateFood";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;

  try {
    // Find the donation by ID
    const donation = await DonateFood.findById(id);

    if (!donation) {
      return NextResponse.json(
        { error: "Donation not found" },
        { status: 404 }
      );
    }

    // Update the donation status to 'accepted'
    donation.status = "accepted";
    await donation.save();

    return NextResponse.json(
      { message: "Donation accepted successfully", donation },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to accept donation" },
      { status: 500 }
    );
  }
}
