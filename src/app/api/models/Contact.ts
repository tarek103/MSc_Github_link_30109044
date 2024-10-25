// /models/Contact.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IContact extends Document {
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

const contactSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
