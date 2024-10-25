// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all users
    const users = await User.find();

    // Return the list of users as JSON
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 }
    );
  }
}
