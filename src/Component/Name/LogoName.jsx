import React from "react";
import "./logoName.css"; // CSS for animated gradient
import Link from "next/link";

const LogoName = () => {
  return (
    <Link href={"/"}>
      <span className="flex justify-center items-center ">
        <span className="logo-gradient font-extrabold">ProdEx</span>
      </span>
    </Link>
  );
};

export default LogoName;
