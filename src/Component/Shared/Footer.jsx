import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import LogoName from "../Name/LogoName";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#f9cdc3] to-[#facefb] text-gray-900 p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-bold mb-2"><LogoName></LogoName></h2>
          <p className="text-gray-800">
            Your ultimate product management solution.
            <br />
            Bringing innovation to your fingertips.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-pink-600 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-purple-500 transition-colors">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Services */}
        <nav className="flex flex-col gap-2">
          <h6 className="font-semibold mb-2">Services</h6>
          <a className="link-hover hover:text-gray-800 transition-colors">Branding</a>
          <a className="link-hover hover:text-gray-800 transition-colors">Design</a>
          <a className="link-hover hover:text-gray-800 transition-colors">Marketing</a>
          <a className="link-hover hover:text-gray-800 transition-colors">Advertisement</a>
        </nav>

        {/* Company */}
        <nav className="flex flex-col gap-2">
          <h6 className="font-semibold mb-2">Company</h6>
          <a className="link-hover hover:text-gray-800 transition-colors">About us</a>
          <a className="link-hover hover:text-gray-800 transition-colors">Contact</a>
          <a className="link-hover hover:text-gray-800 transition-colors">Jobs</a>
          <a className="link-hover hover:text-gray-800 transition-colors">Press kit</a>
        </nav>

        {/* Legal */}
        <nav className="flex flex-col gap-2">
          <h6 className="font-semibold mb-2">Legal</h6>
          <a className="link-hover hover:text-gray-800 transition-colors">Terms of use</a>
          <a className="link-hover hover:text-gray-800 transition-colors">Privacy policy</a>
          <a className="link-hover hover:text-gray-800 transition-colors">Cookie policy</a>
        </nav>
      </div>

      <div className="mt-10 text-center text-gray-700">
        &copy; {new Date().getFullYear()} ProdEx. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
