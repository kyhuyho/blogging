import React from "react";

const Heading = ({ children }) => {
  return (
    <h2 className="font-semibold text-[#3A1097] pt-5 pb-[30px] text-[28px] relative before:content-[attr(before)] before:absolute before:bg-[#00D1ED] before:w-[50px] before:h-1 before:top-0 before:left-0 before:rounded">
      {children}
    </h2>
  );
};

export default Heading;
