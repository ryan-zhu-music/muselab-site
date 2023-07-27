import React from "react";

export default function Button({ text, onClick, type }) {
  let style =
    "bg-teal-500 ring-2 ring-teal-500/90 text-white hover:bg-teal-700/90 hover:text-white";
  if (type === "secondary") {
    style =
      "bg-transparent ring-2 ring-teal-500/90 text-teal-500/90 hover:bg-teal-500/90 hover:text-white";
  }

  if (typeof onClick === "string") {
    return (
      <a
        href={onClick}
        className={`px-4 py-1 lg:px-6 lg:py-2 rounded-lg flex items-center justify-center whitespace-nowrap text-base lg:text-lg font-black duration-300 ease-in-out ${style}`}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 lg:px-6 lg:py-2 rounded-lg flex items-center justify-center whitespace-nowrap text-base lg:text-lg font-black duration-300 ease-in-out ${style}`}
    >
      {text}
    </button>
  );
}
