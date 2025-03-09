"use server";
import { DataBaseConnection } from "@/DataBase/db";
import { sendVerifactionEmail } from "@/lib/resendEMail";
import { User } from "@/Models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  await DataBaseConnection(); // Ensure database connection
  try {
    const { username, email, password } = await request.json();

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required.",
          success: false,
        },
        { status: 400 }
      );
    }

    // Check if username already exists
    const checkUsernameExist = await User.findOne({ username });
    if (checkUsernameExist) {
      return NextResponse.json(
        {
          message: "Username already exists.",
          success: false,
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists. Please login.",
          success: false,
        },
        { status: 400 }
      );
    }

    // Generate OTP and expiry time
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = await new User({
      username,
      email,
      otpCode,
      otpCodeExpiry: otpExpiresAt,
      isVrified: false,
      password: hashedPassword,
    }).save();

    // mail handel
    const id = newUser._id;
    await sendVerifactionEmail(username, email, otpCode, id);

    return NextResponse.json(
      {
        success: true,
        user: { id: newUser._id },
        message: "User registered successfully. Please verify your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to register user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
