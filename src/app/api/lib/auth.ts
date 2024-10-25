// utils/auth.ts
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

// You should keep your secret key in an environment variable for security
const JWT_SECRET = "dhdhdhhdhhdhdhhdhdhhdhhdhdhhdhdh"; // Your specified secret key

interface UserSession {
  id: string;
  role: string; // Ensure this matches what you include in the token
  // Add other fields as necessary
}

// Function to get session from the request
export const getSession = async (
  req: NextRequest
): Promise<UserSession | null> => {
  const cookie = req.cookies.get("token"); // Adjust the cookie name if necessary

  if (!cookie) {
    return null; // No token, no session
  }

  try {
    const decoded = jwt.verify(cookie.value, JWT_SECRET) as unknown; // First convert to unknown

    // Now cast to UserSession
    const session = decoded as UserSession;

    return session; // Return the decoded user info
  } catch (error) {
    console.error("Failed to verify token:", error);
    return null; // Invalid token
  }
};
