"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaDollarSign,
  FaInfoCircle,
  FaArrowLeft,
  FaIndustry,
  FaBoxes,
  FaBarcode,
  FaPalette,
  FaCalendarAlt,
  FaTags,
} from "react-icons/fa";
import { getOneProduct } from "../allproducts";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getOneProduct(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-700">
        <p className="text-lg">Product not found.</p>
        <Link
          href="/products"
          className="mt-4 bg-gradient-to-r from-[#f9cdc3] to-[#facefb] text-gray-800 font-medium rounded-xl px-5 py-2 shadow hover:opacity-90 transition"
        >
          <FaArrowLeft className="inline mr-2" /> Back to Products
        </Link>
      </div>
    );
  }

  // Split categories by comma (assuming string like "a,a,a")
  const categories = product.category.split(",").map((c) => c.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9cdc3] to-[#facefb] p-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden p-8 grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl shadow-lg w-full max-h-[500px] object-contain"
          />
        </motion.div>

        {/* Right Side - Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col justify-center space-y-5"
        >
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <FaBoxOpen className="text-pink-500" /> {product.name}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed flex items-start gap-3">
            <FaInfoCircle className="text-blue-500 mt-1" /> {product.description}
          </p>

          <p className="text-2xl font-bold text-pink-600 flex items-center gap-2">
            <FaDollarSign /> ${product.price}
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                <FaTags className="text-pink-500" /> {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base">
            <p className="flex items-center gap-2">
              <FaIndustry className="text-indigo-500" /> Brand: {product.brand}
            </p>
            <p className="flex items-center gap-2">
              <FaBoxes className="text-green-500" /> Stock: {product.stock}
            </p>
            <p className="flex items-center gap-2">
              <FaBarcode className="text-orange-500" /> SKU: {product.sku}
            </p>
            <p className="flex items-center gap-2">
              <FaPalette className="text-pink-500" /> Color: {product.color}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-red-500" /> Release: {product.releaseDate}
            </p>
          </div>

          <Link
            href="/allProducts"
            className="inline-flex items-center gap-2 w-fit bg-gradient-to-r from-[#f9cdc3] to-[#facefb] text-gray-800 font-medium rounded-xl px-6 py-3 shadow hover:opacity-90 transition"
          >
            <FaArrowLeft /> Back to Products
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
