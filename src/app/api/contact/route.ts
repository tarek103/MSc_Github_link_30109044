// /app/api/contact/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import Contact from "../models/Contact";

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    const { email, subject, message } = body;

    // Validate the input fields
    if (!email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Create a new contact entry
    const newContact = new Contact({ email, subject, message });
    await newContact.save();

    // Respond with success
    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export function GET() {
  return NextResponse.json(
    { message: "Method GET Not Allowed" },
    { status: 405 }
  );
}
