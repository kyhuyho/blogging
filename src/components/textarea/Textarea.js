import React from "react";
import { useController } from "react-hook-form";

const Textarea = ({ name, control, ...props }) => {
  const { field } = useController({ name, control, defaultValue: "" });
  return (
    <div className="w-full h-[250px]">
      <textarea
        className="bg-[#E7ECF3] resize-none border border-transparent outline-none p-5 w-full h-full rounded-lg font-semibold focus:border-[#00B4AA] focus:bg-[#fff] transition-all"
        {...field}
        {...props}
      ></textarea>
    </div>
  );
};

export default Textarea;
