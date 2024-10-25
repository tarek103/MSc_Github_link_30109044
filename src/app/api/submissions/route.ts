// app/api/submissions/route.ts

import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import FormSubmission from "../models/FormSubmission";

// Function to handle PUT request to update the status of a form submission
export async function PUT(request: Request) {
  await dbConnect();

  const body = await request.json();
  const { id } = body; // Get the submission ID from the request body

  if (!id) {
    return NextResponse.json(
      { error: "Submission ID is required" },
      { status: 400 }
    );
  }

  try {
    // Find the submission by ID and update its status to "accepted"
    const updatedSubmission = await FormSubmission.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    );

    if (!updatedSubmission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Request accepted",
      submission: updatedSubmission,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}

// Function to handle GET request to fetch all form submissions
export async function GET() {
  await dbConnect();

  try {
    // Retrieve all form submissions
    const submissions = await FormSubmission.find();
    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
