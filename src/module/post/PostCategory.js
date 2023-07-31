import React from "react";
import { NavLink } from "react-router-dom";

const PostCategory = ({ children, type = "primary", to = "/" }) => {
  let bgColorClass = "";
  switch (type) {
    case "primary":
      bgColorClass = "bg-[#F3EDFF]";
      break;
    case "secondary":
      bgColorClass = "bg-white";
      break;
    default:
      break;
  }
  return (
    <div
      className={`text-[#6B6B6B] text-center ${bgColorClass} rounded-lg w-max font-semibold inline-block py-1 px-[10px]`}
    >
      <NavLink to={to} className="block">
        {children}
      </NavLink>
    </div>
  );
};

export default PostCategory;
