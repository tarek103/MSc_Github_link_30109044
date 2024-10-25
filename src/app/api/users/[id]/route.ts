import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

// Handle GET requests to fetch user by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Extract the user ID from the params

  await dbConnect(); // Ensure a database connection

  try {
    // Find user by ID
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Log the user's email
    console.log("User email:", user.email);

    // Return the user data
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
