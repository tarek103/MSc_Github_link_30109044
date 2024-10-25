// models/DonateFood.ts
import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./User"; // Ensure that IUser is defined properly in your User model

// Define the DonateFood document interface
export interface IDonateFood extends Document {
  donator: IUser["_id"]; // Reference to the User who donates
  foodName: string; // Food name
  foodDescription: string; // Food description
  quantity: number; // Food quantity
  image: string; // Image URL
  location: string; // Location
  time: string; // Pickup time
  message: string; // Additional message
  status: "pending" | "accepted" | "delivered"; // Donation status
  createdAt: Date; // Date of creation
  expiryDate: string; // Expiry date of the food
}

// Define the schema for DonateFood
const donateFoodSchema: Schema = new mongoose.Schema({
  donator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  foodDescription: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Assuming you're storing a URL to the image
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "delivered"],
    default: "pending",
  },
  expiryDate: {
    type: String,
    required: true, // Mark this as required or optional based on your needs
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const DonateFood: Model<IDonateFood> =
  mongoose.models.DonateFood ||
  mongoose.model<IDonateFood>("DonateFood", donateFoodSchema);

export default DonateFood;
