import React from "react";

const LabelStatus = ({ children, type = "" }) => {
  let labelStatus = "";
  switch (type) {
    case "success":
      labelStatus = "bg-green-500 text-green-500";
      break;
    case "warning":
      labelStatus = "bg-orange-500 text-orange-500";
      break;
    case "danger":
      labelStatus = "bg-red-500 text-red-500";
      break;
    default:
      break;
  }
  return (
    <span
      className={`inline-block px-3 py-4 bg-opacity-20 rounded-lg ${labelStatus}`}
    >
      {children}
    </span>
  );
};

export default LabelStatus;
