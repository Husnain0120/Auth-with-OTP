import { Resend } from "resend";
import verifaction from "../../EmailTemp/verifcationEmail";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_EMAIL);

export const sendVerifactionEmail = async (username, email, otpCode, id) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "OTP verifcationEmail",
      react: verifaction({ username, otp: otpCode, id }),
    });

    return NextResponse.json({
      success: true,
      message: " Send verifation email successfully",
    });
  } catch (error) {
    console.log(error, "Failed to send email");
  }
};
