import useClickOutSide from "../../hooks/useClickOutSide";
import React from "react";
import DropdownOption from "./DropdownOption";

const Dropdown = ({ children, label }) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  return (
    <div className="relative w-full" ref={nodeRef}>
      <div
        className="w-full cursor-pointer flex items-center p-5 bg-[#E7ECF3] font-semibold rounded-lg"
        onClick={() => setShow(!show)}
      >
        {label}
        <span className="ml-auto">
          {!show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </span>
      </div>
      {show && (
        <div className="absolute w-full z-10 top-full translate-y-[10px] bg-[#E7ECF3] rounded-lg">
          <DropdownOption onClick={() => setShow(false)}>
            {children}
          </DropdownOption>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
