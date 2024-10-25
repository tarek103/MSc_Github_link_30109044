// app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Clear the token cookie
    response.cookies.set("token", "", {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: true, // Use secure cookies in production
      maxAge: -1, // Set maxAge to -1 to delete the cookie
      path: "/", // Cookie available for all routes
      sameSite: "lax", // CSRF protection
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error); // Log the error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
