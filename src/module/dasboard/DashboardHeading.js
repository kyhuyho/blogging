import React from "react";

const DashboardHeading = ({ title = "", desc = "" }) => {
  return (
    <div className="mb-12">
      <h1 className="font-semibold text-[#2EBAC1] text-[40px] mb-3">{title}</h1>
      <p className="text-lg font-medium">{desc}</p>
    </div>
  );
};

export default DashboardHeading;
