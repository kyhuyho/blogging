import React from "react";
import "./stylesPagination.scss";

const Pagination = () => {
  return (
    <div className="flex items-center text-lg font-semibold cursor-pointer gap-x-3">
      <span className="pagination-prev">
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
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </span>
      <ul className="flex items-center gap-x-3">
        <li className="pagination-item">1</li>
        <li className="pagination-item">2</li>
        <li className="pagination-item">...</li>
        <li className="pagination-item">3</li>
        <li className="pagination-item">4</li>
      </ul>
      <span className="pagination-next">
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
    </div>
  );
};

export default Pagination;
