import { current } from "@reduxjs/toolkit";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageLimitInCenter = 3;

  const getPageNumbers = () => {
    let pages: (number | string)[] = [];

    if (totalPages <= pageLimitInCenter + 2) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= pageLimitInCenter) {
      pages = Array.from({ length: pageLimitInCenter + 1 }, (_, i) => i + 1);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage > totalPages - pageLimitInCenter) {
      pages.push(1);
      pages.push("...");
      pages = pages.concat(
        Array.from(
          { length: pageLimitInCenter + 1 },
          (_, i) => totalPages - pageLimitInCenter + i
        )
      );
    } else {
      const startPage = Math.max(
        currentPage - Math.floor(pageLimitInCenter / 2),
        1
      );
      const endPage = Math.min(
        currentPage + Math.floor(pageLimitInCenter / 2),
        totalPages
      );

      if (startPage > 1) {
        pages.push(1);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      if (endPage < totalPages) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md mr-2 ${
          currentPage === 1
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-gray-700 text-white"
        }`}
      >
        Previous
      </button>

      <div className="flex space-x-2">
        {pages.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-3 py-1 text-lg text-white">
              {page}
            </span>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ml-2 cursor-pointer ${
          currentPage === totalPages
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-gray-700 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;