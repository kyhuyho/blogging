import React from "react";
import { NavLink } from "react-router-dom";

const PostTitle = ({
  children,
  size = "normal",
  to,
  lineHeight = "",
  ...props
}) => {
  let sizeText = "";
  switch (size) {
    case "normal":
      sizeText = "text-lg";
      break;
    case "big":
      sizeText = "text-[22px]";
      break;
    case "bigger":
      sizeText = "text-[36px]";
      break;
    default:
      break;
  }
  if (to)
    return (
      <h3
        className={`${sizeText} font-semibold ${lineHeight} ${
          props.mt || "mt-[10px]"
        }`}
      >
        <NavLink to={to} className="block">
          {children}
        </NavLink>
      </h3>
    );
  return (
    <h3
      className={`${sizeText} font-semibold ${lineHeight} ${
        props.mt || "mt-[10px]"
      }`}
    >
      {children}
    </h3>
  );
};

export default PostTitle;
