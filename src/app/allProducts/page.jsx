"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allProducts } from "./allproducts";
import Container from "@/utils/Container";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await allProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Container className="bg-gradient-to-br from-[#f9cdc3] to-[#facefb]">
      <div className="min-h-screen  p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          All Products
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">
            No products found.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5 space-y-3">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-pink-600">
                    ${product.price}
                  </p>

                  <Link
                    href={`/allProducts/${product._id}`}
                    className="inline-block mt-3 bg-gradient-to-r from-[#f9cdc3] to-[#facefb] text-gray-800 font-medium rounded-xl px-5 py-2 shadow hover:opacity-90 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
