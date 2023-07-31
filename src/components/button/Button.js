import React from "react";
import LoadingSpinner from "../loading/LoadingSpinner";
import { NavLink } from "react-router-dom";

const Button = ({ type, children, isLoading, to, kind, ...props }) => {
  let bgClassName = "";
  const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  switch (kind) {
    case "primary":
      bgClassName = "bg-gradient-to-r from-[#00A7B4] to-[#A4D96C] text-white";
      break;
    case "secondary":
      bgClassName = "bg-white text-[#00A7B4]";
      break;
    case "third":
      bgClassName = "bg-green-500 bg-opacity-20 text-green-500";
      break;
    default:
      break;
  }
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className="block">
        <button
          className={`block w-full px-6 text-lg font-semibold rounded-lg ${bgClassName} ${
            props.height || "h-[65px]"
          } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
          {...props}
        >
          {child}
        </button>
      </NavLink>
    );
  }
  return (
    <button
      className={`block w-full px-6 text-lg font-semibold rounded-lg ${bgClassName} ${
        props.height || "h-[65px]"
      } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
      {...props}
    >
      {child}
    </button>
  );
};

export default Button;
