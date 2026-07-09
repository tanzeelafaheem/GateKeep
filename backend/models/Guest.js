import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      required: true,
    },

    visitDate: {
      type: Date,
      required: true,
    },

    visitTime: {
      type: String,
      required: true,
    },
    qrCode: {
    type: String,
    unique: true,
    required: true,
  },
  // This stores the generated QR image
  qrImage: {
    type: String,
    required: true,
  },

    status: {
      type: String,
      enum: [
        "Pending",
        "Entered",
        "Completed",
        "Expired",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Guest", guestSchema); 