// File: stackcher.js

import mongoose, { Schema } from "mongoose";

// Define the User Schema with detailed validations and comments
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensures no two users share the same email
      lowercase: true, // Converts the email to lowercase before saving
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // Basic regex validation for email format
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: { type: Boolean, default: false },
    otpCode: {
      type: String,
      // required: true,
    },
    otpCodeExpiry: {
      type: Date,
      // required: true,
    },
    forgotPassword: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
