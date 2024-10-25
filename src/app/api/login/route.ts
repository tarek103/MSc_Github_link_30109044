// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";

// Hardcoded the JWT secret key
const JWT_SECRET = "dhdhdhhdhhdhdhhdhdhhdhhdhdhhdhdh"; // Your specified secret key

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    // Validate request data
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token as a cookie
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // Set the cookie with httpOnly and secure flags
    response.cookies.set("token", token, {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: true, // Use secure cookies in production
      maxAge: 60 * 60, // 1 hour
      path: "/", // Cookie available for all routes
      sameSite: "lax", // CSRF protection
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error); // Log the error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
