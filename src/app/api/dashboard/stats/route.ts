import { NextResponse } from "next/server"; // Assumes you have a connectDB utility to connect to MongoDB
import dbConnect from "../../lib/dbConnect";
import DonateFood from "../../models/DonateFood";
import User from "../../models/User";

export async function GET() {
  try {
    await dbConnect(); // Ensure the database is connected

    // Get total number of volunteers
    const volunteerCount = await User.countDocuments({ role: "volunteer" });

    // Get total number of donators
    const donatorCount = await User.countDocuments({ role: "donator" });

    // Get the total food quantity from donations
    const foodDonations = await DonateFood.aggregate([
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
    ]);

    // Ensure food quantity is at least 0
    const totalFoodQuantity =
      foodDonations.length > 0 ? foodDonations[0].totalQuantity : 0;

    // Return the stats in JSON format
    return NextResponse.json({
      volunteerCount,
      donatorCount,
      totalFoodQuantity,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return new Response(`Error: ${error.message}`, { status: 500 });
    } else {
      console.error("An unknown error occurred");
      return new Response("An unknown error occurred", { status: 500 });
    }
  }
}
