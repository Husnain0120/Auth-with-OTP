import { DataBaseConnection } from "@/DataBase/db";
import { NextResponse } from "next/server";

export async function POST() {
  await DataBaseConnection();
  try {
    const res = NextResponse.json(
      {
        message: "Logout Successfully",
        success: true,
      },
      { status: 200 }
    );
    res.cookies.set("token", "", {
      httpOnly: true,
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Failed to logout" });
  }
}
