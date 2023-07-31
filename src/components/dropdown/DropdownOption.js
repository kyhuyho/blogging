import React from "react";

const DropdownOption = ({ children, ...props }) => {
  return (
    <div className="dropdown-option" {...props}>
      {children}
    </div>
  );
};

export default DropdownOption;
