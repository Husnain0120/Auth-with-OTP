"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function UseCases() {
  const useCases = [
    {
      title: "Financial Services",
      description:
        "Secure transactions, account access, and sensitive financial operations with time-limited verification codes.",
      image: "/finance.png",
    },
    {
      title: "Healthcare",
      description:
        "Protect patient data and ensure only authorized personnel can access medical records and sensitive information.",
      image: "/capsoule.png?height=400&width=600",
    },
    {
      title: "E-commerce",
      description:
        "Verify customer identity during checkout and protect against fraudulent purchases and account takeovers.",
      image: "/e-comrance.png?height=400&width=600",
    },
    {
      title: "Government Services",
      description:
        "Secure citizen access to government portals, tax filings, and other sensitive public services.",
      image: "/bank.png?height=400&width=600",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            OTP Verification Use Cases
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover how different industries leverage OTP verification to
            enhance security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <div className="relative h-48">
                <Image
                  src={useCase.image || "/placeholder.svg"}
                  alt={`${useCase.title} illustration`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-gray-700">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
