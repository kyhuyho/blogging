import React from "react";
import { NavLink } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <NavLink to="/">
        <img srcSet="/404.png 2x" alt="" />
      </NavLink>
      <h1 className="font-semibold text-[50px] my-5">Oops! Page not found</h1>
      <NavLink
        to="/"
        className="bg-[#2EBAC1] px-7 py-3 text-white rounded-md text-xl font-medium"
      >
        Back to home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
