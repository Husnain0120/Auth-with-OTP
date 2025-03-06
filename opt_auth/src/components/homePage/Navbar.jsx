"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#HowItWorks" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Pricing", href: "#pricing" },
    { name: "Documentation", href: "#docs" },
  ];

  const loginToken = false;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold mr-2">
                OTP
              </div>
              <span className="text-lg font-bold">OTPVerify</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-black transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-4 py-2 rounded-lg font-medium"
            >
              Get Started
            </motion.button>
            {loginToken ? (
              <div className="px-3 py-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <Link href={"/login"}>
                <div className="px-3 py-3 ">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </motion.button>
                </div>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                // Icon when menu is open
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-3 py-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </motion.button>
              </div>
              {loginToken ? (
                <div className="px-3 py-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="px-3 py-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
