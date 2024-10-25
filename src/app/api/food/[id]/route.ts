import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import DonateFood from "../../models/DonateFood";

// Connect to MongoDB
dbConnect();

// GET request handler to fetch the food donation by id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Find the food item by its ID
    const food = await DonateFood.findById(id).populate("donator");

    if (!food) {
      return NextResponse.json(
        { message: "Food item not found" },
        { status: 404 }
      );
    }

    // Return the found food data
    return NextResponse.json(food, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
