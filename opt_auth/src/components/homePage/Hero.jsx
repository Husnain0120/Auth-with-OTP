"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Secure Your Digital Identity with OTP Verification
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            {/* {data.username}---{" "} */}
            <span className="px-2 bg-amber-600 text-white font-medium italic rounded-md text-center">
              npx-create-opt-auth
            </span>{" "}
            Protect your users and data with our advanced one-time password
            verification system. Simple to implement, powerful to use.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-black px-8 py-3 rounded-lg font-medium"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden "
        >
          <Image
            src="/authImage.png"
            alt="OTP Verification illustration"
            fill
            className="object-cover"
            priority
            sizes="1000px"
          />
        </motion.div>
      </div>
    </section>
  );
}
