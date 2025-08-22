"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct } from "./addProduct";
import { ErrorToast, SuccessToast } from "@/utils/Toast";

// React Icons
import { FaTag, FaInfoCircle, FaDollarSign, FaPalette } from "react-icons/fa";
import { BiCategory, BiBarcode } from "react-icons/bi";
import { AiOutlineTrademark, AiOutlineStock } from "react-icons/ai";
import { MdDateRange, MdImage } from "react-icons/md";

// Framer Motion
import { motion } from "framer-motion";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    sku: "",
    color: "",
    releaseDate: "",
  });
  const [image, setImage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image!");
      return;
    }

    setLoading(true);

    try {
      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=c9561a746e029a6eca0db929f13da262`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgData = await res.json();

      if (imgData.success) {
        const imageUrl = imgData.data.url;

        // Send product data to your API
        const productData = { ...form, image: imageUrl };

        const res = addProduct(productData);

        if ((await res).success) {
          SuccessToast("Product added successfully");
        } else {
          ErrorToast("Something went wrong !!");
        }
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto text-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <InputField
            icon={<FaTag />}
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            type="text"
          />

          {/* Description */}
          <InputField
            icon={<FaInfoCircle />}
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product description"
            textarea
          />

          {/* Price */}
          <InputField
            icon={<FaDollarSign />}
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            type="number"
          />

          {/* Category */}
          <InputField
            icon={<BiCategory />}
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Enter category"
            type="text"
          />

          {/* Brand */}
          <InputField
            icon={<AiOutlineTrademark />}
            label="Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Enter brand"
            type="text"
          />

          {/* Stock */}
          <InputField
            icon={<AiOutlineStock />}
            label="Stock Quantity"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Enter available stock"
            type="number"
          />

          {/* SKU */}
          <InputField
            icon={<BiBarcode />}
            label="SKU / Product Code"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="Enter SKU code"
            type="text"
          />

          {/* Color */}
          <InputField
            icon={<FaPalette />}
            label="Color"
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Enter product color"
            type="text"
          />

          {/* Release Date */}
          <InputField
            icon={<MdDateRange />}
            label="Release Date"
            name="releaseDate"
            value={form.releaseDate}
            onChange={handleChange}
            placeholder="Select release date"
            type="date"
          />

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
              <MdImage /> Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#f9cdc3] to-[#facefb] text-gray-800 font-semibold rounded-xl px-6 py-3 shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Product"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

/* Reusable Input Component with Icons */
function InputField({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea = false,
}) {
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
        {icon} {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          rows="4"
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
