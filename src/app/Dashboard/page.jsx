"use client";


import { FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";


export default function DashboardPage() {
  return (
    <section>
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to <span className="text-pink-500">Pordex</span> Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex items-center gap-4">
          <div className="p-4 bg-gradient-to-r from-[#f9cdc3] to-[#facefb] rounded-xl">
            <FaBox className="text-gray-700 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">120</h2>
            <p className="text-gray-600">Products</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex items-center gap-4">
          <div className="p-4 bg-gradient-to-r from-[#f9cdc3] to-[#facefb] rounded-xl">
            <FaShoppingCart className="text-gray-700 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">85</h2>
            <p className="text-gray-600">Sales</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex items-center gap-4">
          <div className="p-4 bg-gradient-to-r from-[#f9cdc3] to-[#facefb] rounded-xl">
            <FaUsers className="text-gray-700 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">45</h2>
            <p className="text-gray-600">Users</p>
          </div>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Products</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-gray-600">Name</th>
              <th className="py-3 px-4 text-gray-600">Price</th>
              <th className="py-3 px-4 text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50 transition text-black">
              <td className="py-3 px-4">Wireless Headphones</td>
              <td className="py-3 px-4">$120</td>
              <td className="py-3 px-4 text-green-900 font-medium">Available</td>
            </tr>
            <tr className="border-b hover:bg-gray-50 transition text-black">
              <td className="py-3 px-4">Smartphone Case</td>
              <td className="py-3 px-4">$25</td>
              <td className="py-3 px-4 text-green-900 font-medium">Available</td>
            </tr>
            <tr className="border-b hover:bg-gray-50 transition text-black">
              <td className="py-3 px-4">Gaming Keyboard</td>
              <td className="py-3 px-4">$90</td>
              <td className="py-3 px-4 text-red-600 font-medium">Out of Stock</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
