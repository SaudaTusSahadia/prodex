"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import shopAnimation from '../../../public/animation/Cube shape animation.json';
import Lottie from "lottie-react";



export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-br from-[#f9cdc3] to-[#facefb] min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
      
      {/* Background Shapes */}
      <div className="absolute w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl top-[-100px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-white/20 rounded-full blur-3xl bottom-[-120px] right-[-100px]" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl items-center md:items-start gap-8">
        
        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-3/5 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
              Pordex
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-700">
            Discover amazing products, explore details, and manage your own store with ease.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link href={'/allProducts'}>
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#f9cdc3] to-[#facefb] text-gray-800 font-semibold rounded-xl px-6 py-3 shadow-lg hover:opacity-90 transition">
                Explore Products <FaArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href={`/auth/login`}>
              <button className="rounded-xl px-6 py-3 border border-gray-300 bg-white/80 text-gray-700 shadow hover:bg-white transition">
                Login
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side - Animated Image/Graphic */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-full md:w-2/5 flex justify-center md:justify-end"
        >
          <div className="w-64 h-64 bg-white/20 rounded-3xl shadow-lg flex items-center justify-center">
            {/* You can replace this div with an image or illustration */}
            <div className="text-gray-500 font-bold">
                <Lottie animationData={shopAnimation} loop={true} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
