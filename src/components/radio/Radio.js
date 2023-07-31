import React from "react";
import { useController } from "react-hook-form";
import "./stylesRadio.scss";

const Radio = ({ name, control, children, ...props }) => {
  const { field } = useController({ name, control, defaultValue: "" });
  return (
    <label className="cursor-pointer custom-radio">
      <input type="radio" className="hidden" {...field} {...props} />
      <div className="flex items-center gap-x-4">
        <div className="custom-radio-spin">
          <div className="w-full h-full rounded-full"></div>
        </div>
        <span className="font-semibold">{children}</span>
      </div>
    </label>
  );
};

export default Radio;
