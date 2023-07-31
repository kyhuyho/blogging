import React from "react";

const Field = ({ children }) => {
  return (
    <div className="flex flex-col items-start mb-5 gap-y-5">{children}</div>
  );
};

export default Field;
