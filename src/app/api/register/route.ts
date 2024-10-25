// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure database connection

    const { name, email, password, role } = await req.json();

    // Validate input data (simple validation, expand as needed)
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save(); // Save the new user to the database

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user registration:", error); // Log error to the console
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
