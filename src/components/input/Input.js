import React from "react";
import "./stylesInput.scss";
import { useController } from "react-hook-form";

const Input = ({
  name,
  control,
  type = "text",
  children,
  hasIcon,
  ...props
}) => {
  const { field } = useController({ name, control, defaultValue: "" });
  return (
    <div className="relative w-full">
      <input
        id={name}
        type={type}
        className={`${
          hasIcon ? "py-5 pl-5 pr-[60px]" : "p-5"
        } input border border-transparent rounded-lg w-full focus:border-[#00B4AA] transition-all font-semibold text-base bg-[#E7ECF3] focus:bg-[#fff]`}
        {...field}
        {...props}
      />
      {children}
    </div>
  );
};

export default Input;
