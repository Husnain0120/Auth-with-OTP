"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      title: "Request Generation",
      description:
        "User requests access and the system generates a unique, time-sensitive code.",
      delay: 0.1,
    },
    {
      title: "Secure Delivery",
      description:
        "The OTP is delivered via SMS, email, or authenticator app to the user's registered device.",
      delay: 0.2,
    },
    {
      title: "User Verification",
      description: "User enters the received code to verify their identity.",
      delay: 0.3,
    },
    {
      title: "Authentication",
      description: "System validates the code and grants access if correct.",
      delay: 0.4,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            How OTP Verification Works
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            One-Time Password verification adds an essential layer of security
            to your authentication process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.delay, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2"
          >
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="OTP Process illustration"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
