import React from "react";
import { NavLink } from "react-router-dom";

const PostImage = ({
  url = "",
  alt = "",
  borderRadius = "",
  to = null,
  height,
}) => {
  if (to) {
    return (
      <NavLink to={to} className="block h-full">
        <div className={`${height} ${borderRadius}`}>
          <img
            src={url}
            alt={alt}
            loading="lazy"
            className="object-cover w-full h-full rounded-[inherit]"
          />
        </div>
      </NavLink>
    );
  }
  return (
    <div className={`${height} ${borderRadius}`}>
      <img
        src={url}
        alt={alt}
        className="object-cover w-full h-full rounded-[inherit]"
      />
    </div>
  );
};

export default PostImage;
