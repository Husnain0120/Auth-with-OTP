"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Implementation() {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Easy to Implement</h2>
            <p className="text-lg text-gray-700 mb-6">
              Our OTP verification system integrates seamlessly with your
              existing authentication flow, requiring minimal code changes.
            </p>
            <div className="bg-black/5 p-6 rounded-lg font-mono text-sm mb-6">
              <pre className="whitespace-pre-wrap">
                {`// Example implementation
const sendOTP = async (phoneNumber) => {
  const response = await api.sendVerification(phoneNumber);
  return response.requestId;
};

const verifyOTP = async (requestId, code) => {
  const result = await api.checkVerification(requestId, code);
  return result.valid;
};`}
              </pre>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-2 rounded-lg font-medium"
            >
              View Documentation
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Implementation illustration"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
