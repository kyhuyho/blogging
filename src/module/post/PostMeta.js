import React from "react";

const PostMeta = ({
  date = "Mar 23",
  authorName = "Andiez Le",
  type = "primary",
  mt,
}) => {
  let textColor = "";
  let bgColor = "";
  switch (type) {
    case "primary":
      textColor = "text-[#6B6B6B]";
      bgColor = "bg-[#B1B5C3]";
      break;
    case "secondary":
      textColor = "text-[#F8F9FA]";
      bgColor = "bg-[#F8F9FA]";
      break;
    default:
      break;
  }
  return (
    <div
      className={`flex items-center font-semibold text-sm gap-x-3 ${textColor} ${
        mt ? "mt-[10px]" : ""
      }`}
    >
      <span>{date}</span>
      <span className={`w-[6px] h-[6px] rounded-full ${bgColor}`}></span>
      <span>{authorName}</span>
    </div>
  );
};

export default PostMeta;
