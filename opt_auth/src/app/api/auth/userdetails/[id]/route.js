import { DataBaseConnection } from "@/DataBase/db";
import { User } from "@/Models/user.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await DataBaseConnection();

  try {
    const { id } = await params; // ✅ Get ID from the URL path

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required", success: false },
        { status: 400 }
      );
    }

    const user = await User.findById(id).select(
      "-password -otpCode -otpCodeExpiry"
    );

    return NextResponse.json(
      { message: "Get user details successfully", user, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "Failed to get User Details");
    return NextResponse.json(
      { message: "Failed to get user", success: false },
      { status: 500 }
    );
  }
}
