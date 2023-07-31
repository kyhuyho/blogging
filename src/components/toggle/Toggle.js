import React from "react";

const Toggle = ({ on, ...props }) => {
  return (
    <div
      className={`w-[80px] h-[42px] rounded-full cursor-pointer inline-block p-1 ${
        on ? "bg-[#00B4AA]" : "bg-gray-300 transition-all"
      }`}
      {...props}
    >
      <span
        className={`inline-block bg-white rounded-full w-[34px] h-[34px] transition-all ${
          on ? "translate-x-[38px]" : ""
        }`}
      ></span>
    </div>
  );
};

export default Toggle;
