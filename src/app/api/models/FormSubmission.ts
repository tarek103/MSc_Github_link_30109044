// models/FormSubmission.ts
import { Schema, model, models } from "mongoose";

const FormSubmissionSchema = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending", // Default status is 'pending'
  },
});

const FormSubmission =
  models.FormSubmission || model("FormSubmission", FormSubmissionSchema);

export default FormSubmission;
