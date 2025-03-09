"use server";
import { DataBaseConnection } from "@/DataBase/db";
import { User } from "@/Models/user.model";
import { NextResponse } from "next/server";
import { getUserDataFromToken } from "@/lib/getUserDataFromToken"; // Fixed typo in function name

export async function GET(req) {
  await DataBaseConnection();
  // console.log(req);
  try {
    const userId = await getUserDataFromToken(req); // Fixed function call
    // console.log(userId);

    if (!userId) {
      return NextResponse.json(
        { msg: "Invalid or missing token" },
        { status: 401 }
      );
    }

    const user = await User.findById({ _id: userId });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User found", data: user });
  } catch (error) {
    console.log(error, ": User not found");
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 }); // Added return statement
  }
}
