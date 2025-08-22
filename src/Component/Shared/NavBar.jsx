"use client";
import Link from "next/link";
import React from "react";
import LogoName from "../Name/LogoName";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const session = useSession();
  console.log(session);
  const menuList = (
    <>
      {" "}
      <li>
        <Link href={"/allProducts"}>All Products</Link>
      </li>
      {session.status === "authenticated" && (
        <li>
          <Link href={"/Dashboard"}>Dashboard</Link>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menuList}
            </ul>
          </div>
          <p className="text-3xl">
            <LogoName></LogoName>
          </p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuList}</ul>
        </div>
        <div className="navbar-end flex gap-5 items-center justify-end">
          {session.status !== "authenticated" && (
            <>
              <Link
                href={`/auth/register`}
                className="inline-block  bg-gradient-to-r from-[#f9cdc3] to-[#facefb] text-gray-800 font-medium rounded-xl px-5 py-2 shadow hover:opacity-90 transition"
              >
                Register
              </Link>
              <Link
                href={`/auth/login`}
                className="inline-block  bg-gradient-to-r from-[#f9cdc3] to-[#facefb] text-gray-800 font-medium rounded-xl px-5 py-2 shadow hover:opacity-90 transition"
              >
                Login
              </Link>
            </>
          )}

          <div className="tooltip tooltip-left ">
            <div className="tooltip-content">
              <div className="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">
                { session?.data?.user?.name}
              </div>
            </div>
            <button className="">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                  <img
                    src={
                      session?.data?.user?.image ||
                      "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                    }
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
