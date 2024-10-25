import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

interface Params {
  id: string; // Define 'id' as a string
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const { id } = params; // Get user id from the URL

  try {
    await dbConnect();

    // Find user by ID and update role to 'volunteer'
    const user = await User.findByIdAndUpdate(
      id,
      { role: "volunteer" },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User role updated to volunteer",
      user,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update user role." },
      { status: 500 }
    );
  }
}
