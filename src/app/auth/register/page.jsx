"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleRegister } from "./register";
import { ErrorToast } from "@/utils/Toast";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [image, setImage] = useState(null); // local file
  const [uploadedImage, setUploadedImage] = useState(null); // URL from ImgBB
  const [uploadingImage, setUploadingImage] = useState(false); // image uploading state

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection & upload immediately
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=c9561a746e029a6eca0db929f13da262`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgData = await res.json();

      if (!imgData.success) {
        toast.error("Image upload failed!");
        setUploadingImage(false);
        return;
      }

      const imageUrl = imgData.data.url;
      setUploadedImage(imageUrl); // show image preview
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed!");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!uploadedImage) {
      toast.error("Please upload a profile photo first!");
      return;
    }

    setLoading(true);

    try {
      const userData = { ...form, profilePhoto: uploadedImage };
      console.log("Register user data:", userData);

      const res = await handleRegister(userData);

      if (res.success) {
        toast.success("Registration successful!");
      } else {
        ErrorToast("Something went wrong !!");
      }

      // Call your backend API here
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Preview */}
          {uploadedImage && (
            <div className="flex justify-center mt-4">
              <img
                src={uploadedImage}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full border-2 border-pink-300 shadow-lg"
              />
            </div>
          )}
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Confirm Password"
            />
          </div>

          {/* Profile Photo */}
          <div>
            <div className=" grid grid-cols-2 text-black">
              <label className="  mb-1 font-medium text-gray-700">
                Profile Photo
              </label>
              {uploadingImage && (
                <div className="flex">
                  Uploading{" "}
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              //   className="w-full"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !uploadedImage || uploadingImage}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-xl px-6 py-3 shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center text-gray-700">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-700 transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
