"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function VerifyPage() {
  // Static verification state - set to false initially
  const verify = true;

  // Create refs for the 6 input fields
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // State to store the verification code
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Handle input change
  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Create a new array with the updated value
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    // If the input has a value and it's not the last input, focus the next input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle key down event
  const handleKeyDown = (index, e) => {
    // If backspace is pressed and the input is empty, focus the previous input
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();

    // Get the pasted text
    const pastedText = e.clipboardData.getData("text");

    // If the pasted text is a 6-digit number, fill the inputs
    if (/^\d{6}$/.test(pastedText)) {
      const newVerificationCode = pastedText.split("");
      setVerificationCode(newVerificationCode);

      // Focus the last input
      inputRefs[5].current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          {verify ? (
            // Show this content when user is already verified
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-4">Already Verified!</h1>
              <p className="text-gray-600 mb-8">
                Your account has already been verified. You can continue using
                our services.
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-8 py-3 rounded-lg font-medium"
                >
                  Return to Home
                </motion.button>
              </Link>
            </div>
          ) : (
            // Show verification form when user is not verified
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  Verify Your Identity
                </h1>
                <p className="text-gray-600 mb-2">
                  We've sent a 6-digit verification code to your email
                </p>
                <p className="text-gray-600 font-medium">example@email.com</p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter verification code
                  </label>
                  <div
                    className="flex gap-2 sm:gap-4 justify-between"
                    onPaste={handlePaste}
                  >
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={verificationCode[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-full h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Didn't receive the code?{" "}
                    <a href="#" className="text-black font-medium">
                      Resend
                    </a>
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white py-3 rounded-lg font-medium"
                >
                  Verify
                </motion.button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Having trouble?{" "}
                  <a href="#" className="text-black font-medium">
                    Contact Support
                  </a>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}
