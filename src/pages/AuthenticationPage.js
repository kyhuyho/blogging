import React from "react";
import { NavLink } from "react-router-dom";

const AuthenticationPage = ({ children }) => {
  return (
    <div className="min-h-screen p-10">
      <div className="container">
        <div className="mx-auto w-max">
          <NavLink to="/">
            <img srcSet="./logo.png 2x" alt="" />
          </NavLink>
        </div>
        <h1 className="mt-[30px] font-semibold text-4xl text-center text-[#2EBAC1]">
          Monkey Blogging
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthenticationPage;
