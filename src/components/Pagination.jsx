import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const Pagination = ({
  links: { prev, next },
  meta: { total, to, from, links },
  updateFetchUrl,
}) => {
  const handlePrevBtn = async () => {
    updateFetchUrl(prev);
  };
  const handleNextBtn = async () => {
    updateFetchUrl(next);
  };
  return (
    <div className="flex justify-between items-center px-6">
      {/* Help text */}
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing <b>{from}</b> to <b>{to}</b> of <b>{total}</b> Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        {/* Buttons */}

        {/* <button
          disabled={!prev}
          onClick={handlePrevBtn}
          className="flex items-center justify-center size-10 text-sm font-medium  text-stone-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white disabled:opacity-25 disabled:pointer-events-none"
        >
          <HiArrowLeft />
        </button>
        <button
          disabled={!next}
          onClick={handleNextBtn}
          className="flex items-center justify-center size-10 text-sm font-medium  text-stone-900 bg-white border border-gray-200 rounded-e-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white disabled:opacity-25 disabled:pointer-events-none"
        >
          <HiArrowRight />
        </button> */}
        {links.map((link) => {
          return (
            <button
              key={link.label}
              disabled={!link.url}
              onClick={() => {
                updateFetchUrl(link.url);
              }}
              className={`${link.active ? "bg-blue-500 text-white" : "bg-white"}
                flex items-center justify-center size-10 text-sm font-medium  text-stone-900  border-y first:border-l last:border-r border-gray-200 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white disabled:opacity-25 disabled:pointer-events-none`}
            >
              {link.label === "&laquo; Previous" ? (
                <HiArrowLeft />
              ) : link.label === "Next &raquo;" ? (
                <HiArrowRight />
              ) : (
                link.label
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
