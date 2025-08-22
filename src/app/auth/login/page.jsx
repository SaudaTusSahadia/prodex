"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { ErrorToast, SuccessToast } from "@/utils/Toast";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
const result = await signIn("credentials", {
  redirect: false,
  email: form.email,
  password: form.password,
  callbackUrl: "/",
});

      console.log("Result from signin page:", result);

      if (result?.error) {
        // ❌ Login failed
        ErrorToast("Invalid email or password");
      } else if (result?.ok) {
        // ✅ Login success
        SuccessToast("Login successful!");
        // Redirect manually if needed
        window.location.href = result.url || "/";
      } else {
        // ⚠️ Unexpected case
        ErrorToast("Something went wrong, please try again");
      }
    } catch (err) {
      console.error("Signin error:", err);
      ErrorToast(err.message || "Something went wrong");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-8 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Your email"
              className="w-full pl-10 px-4 py-2 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full pl-10 px-4 py-2 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-xl px-6 py-3 shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-700 transition-colors"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
