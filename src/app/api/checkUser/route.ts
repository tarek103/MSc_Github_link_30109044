// app/api/checkUser/route.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = "dhdhdhhdhhdhdhhdhdhhdhhdhdhhdhdh"; // Your specified secret key

interface DecodedToken extends JwtPayload {
  id: string;
  role: string;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken; // Cast the decoded token

    return NextResponse.json(
      { user: { id: decoded.id, role: decoded.role } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
