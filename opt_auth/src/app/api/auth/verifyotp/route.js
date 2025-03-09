"use server";
import { DataBaseConnection } from "@/DataBase/db";
import { sendVerifactionEmail } from "@/lib/resendEMail";
import { User } from "@/Models/user.model";

import { NextResponse } from "next/server";

export async function POST(request) {
  await DataBaseConnection();
  try {
    const { verificationCode } = await request.json();
    if (!verificationCode) {
      return NextResponse.json(
        {
          message: "Inter a valied verification code",
          success: false,
        },
        { status: 400 }
      );
    }
    const user = await User.findOne({
      otpCode: verificationCode,
      otpCodeExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    user.isVerified = true;
    user.otpCode = null;
    user.otpCodeExpiry = null;
    await user.save();
    return NextResponse.json(
      { message: "Email verified", user, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "Failed to Match Otp");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
