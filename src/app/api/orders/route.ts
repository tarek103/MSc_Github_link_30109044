import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import FormSubmission from "../models/FormSubmission";

// API to get all orders by email
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Find all form submissions by email
    const submissions = await FormSubmission.find({ email });

    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
