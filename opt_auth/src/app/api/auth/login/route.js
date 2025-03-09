"use server";
import { DataBaseConnection } from "@/DataBase/db";
import { sendVerifactionEmail } from "@/lib/resendEMail";
import { User } from "@/Models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await DataBaseConnection();
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
          success: false,
        },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    if (user.isVerified === false) {
      return NextResponse.json(
        {
          message:
            "you are not register or verify ,please register or verify first",
          success: false,
        },
        { status: 400 }
      );
    }
    console.log("user exist");
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const payload = {
      id: user?._id,
      username: user?.username,
      email: user?.email,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: `login successfully welcom sir ${payload.username}`,
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error("Failed to login user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
