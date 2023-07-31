import React from "react";

const Label = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[#292D32] text-lg font-semibold cursor-pointer"
    >
      {children}
    </label>
  );
};

export default Label;
