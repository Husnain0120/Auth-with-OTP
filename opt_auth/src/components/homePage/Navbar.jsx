"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [loginToken, setLoginToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    // { name: "Use Cases", href: "#use-cases" },
    // { name: "Pricing", href: "#pricing" },
    // { name: "Documentation", href: "#docs" },
  ];

  async function getUserDetails() {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/userprofile");

      const data = res.data.data;
      if (data) {
        setLoginToken(true);
      }
      setEmail(data.email);
      setUsername(data.username);
    } catch (error) {
      console.error("Failed to get user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  const getAvatarLetter = () => {
    if (!email) return "?";
    return email.charAt(0).toUpperCase();
  };

  // const loginToken = true;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold mr-2 group-hover:scale-105 transition-transform">
                OTP
              </div>
              <span className="text-lg font-bold group-hover:text-gray-800 transition-colors">
                OTPVerify
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-black font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {link.name}
              </Link>
            ))}

            {loginToken && (
              <div className="bg-gray-200 px-2 py-1 rounded-lg border border-gray-200 flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">
                  {getAvatarLetter()}
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold text-gray-900 truncate">
                    {email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{username}</p>
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            ) : loginToken ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-red-600 transition-colors"
                onClick={async () => {
                  try {
                    await axios.post("/api/auth/logout");
                    router.push("/login");
                  } catch (error) {
                    console.error("Failed to logout:", error);
                  }
                }}
              >
                Logout
              </motion.button>
            ) : (
              <Link href="/login">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-800 transition-colors"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors focus:outline-none"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg border-t border-gray-100">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* User profile in mobile view */}
              {loginToken && (
                <div className="mt-4 mb-2 mx-3 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">
                    {getAvatarLetter()}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {email}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{username}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 mt-2 border-t border-gray-200">
                {isLoading ? (
                  <div className="px-3 py-2">
                    <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                ) : loginToken ? (
                  <div className="px-3 py-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-red-500 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm hover:bg-red-600 transition-colors"
                      onClick={async () => {
                        setIsOpen(false);
                        try {
                          await axios.post("/api/auth/logout");
                          router.push("/login");
                        } catch (error) {
                          console.error("Failed to logout:", error);
                        }
                      }}
                    >
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <Link href="/login" className="block w-full">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-black text-white px-4 py-2.5 rounded-lg font-medium shadow-sm hover:bg-gray-800 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </motion.button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
