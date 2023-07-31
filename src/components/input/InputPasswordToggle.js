import React, { useState } from "react";
import IconEyeClose from "../icon/IconEyeClose";
import IconEyeOpen from "../icon/IconEyeOpen";
import Input from "./Input";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <Input
      name="password"
      type={`${togglePassword ? "text" : "password"}`}
      control={control}
      placeholder="Please enter your password"
      hasIcon={true}
    >
      {togglePassword ? (
        <IconEyeOpen
          onClick={() => setTogglePassword(!togglePassword)}
        ></IconEyeOpen>
      ) : (
        <IconEyeClose
          onClick={() => setTogglePassword(!togglePassword)}
        ></IconEyeClose>
      )}
    </Input>
  );
};

export default InputPasswordToggle;
