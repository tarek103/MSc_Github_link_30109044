import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import DonateFood from "../models/DonateFood";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Fetch all the donated food items from the database
    const foods = await DonateFood.find().populate("donator", "name email"); // Assuming 'name' and 'email' are fields in the User model

    return NextResponse.json(foods);
  } catch (error) {
    console.error("Error fetching donated food:", error);
    return NextResponse.json(
      { error: "Failed to fetch donated food" },
      { status: 500 }
    );
  }
}
