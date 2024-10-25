// app/api/donations/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import DonateFood from "../models/DonateFood";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Fetch all donations and populate the donator's details
    // const donations = await DonateFood.find().populate("donator", "name email");
    const donations = await DonateFood.find();

    return NextResponse.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { error: "Failed to fetch donations." },
      { status: 500 }
    );
  }
}
