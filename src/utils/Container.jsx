import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div className={` py-5 ${className}`}>
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 ">
      {children}
    </div>

    </div>
  );
};

export default Container;