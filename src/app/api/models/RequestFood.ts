// models/RequestFood.ts
import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./User";

// Define the RequestFood document interface
export interface IRequestFood extends Document {
  requester: IUser["_id"];
  foodType: string;
  quantityRequested: number;
  location: string;
  status: "pending" | "fulfilled" | "rejected";
  createdAt: Date;
}

// Define the schema for RequestFood
const requestFoodSchema: Schema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
  quantityRequested: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "fulfilled", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RequestFood: Model<IRequestFood> =
  mongoose.models.RequestFood ||
  mongoose.model<IRequestFood>("RequestFood", requestFoodSchema);

export default RequestFood;
