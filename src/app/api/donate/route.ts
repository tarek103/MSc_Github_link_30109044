// app/api/donate/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import DonateFood, { IDonateFood } from "../models/DonateFood";
import { getSession } from "../lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Connect to the database

    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      foodName,
      foodDescription,
      quantity,
      image,
      location,
      time,
      message,
      expiryDate, // Ensure this field is captured correctly
    }: IDonateFood = await req.json();

    // Save the new donation
    const newDonation = new DonateFood({
      donator: session.id,
      foodName,
      foodDescription,
      quantity,
      image,
      location,
      time,
      message,
      expiryDate, // Save the expiry date
      status: "pending", // Default status
    });

    await newDonation.save();

    return NextResponse.json({
      message: "Donation submitted successfully!",
      donation: newDonation,
    });
  } catch (error) {
    console.error("Error submitting donation:", error);
    return NextResponse.json(
      { error: "Failed to submit donation." },
      { status: 500 }
    );
  }
}
