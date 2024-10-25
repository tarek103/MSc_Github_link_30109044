// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

// Define the User document interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "volunteer" | "donator";
  dateJoined: Date;
}

// Define the schema for User
const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "volunteer", "donator"],
    required: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
