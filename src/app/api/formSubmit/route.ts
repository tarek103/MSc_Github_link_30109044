// pages/api/formSubmit/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import FormSubmission from "../models/FormSubmission";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { foodName, email, name, location, message } = await request.json();

    // Ensure all required fields are provided
    if (!foodName || !email || !name || !location || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Create a new form submission
    const newSubmission = new FormSubmission({
      foodName,
      email,
      name,
      location,
      message,
      status: "pending", // Set status as 'pending'
    });

    // Save to the database
    await newSubmission.save();

    return NextResponse.json(
      { message: "Form submitted successfully", data: newSubmission },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
