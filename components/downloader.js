import React from "react";

export default function Downloader({ title, filename, icon, className }) {
  const onClick = () => {
    let a = document.createElement("a");
    a.href = "/downloads/" + filename;
    a.download = filename;
    a.click();
  };
  return (
    <button
      className={
        "relative flex flex-col w-80 h-44 items-center justify-center rounded-lg backdrop-blur-sm ring-1 ring-slate-600 bg-blue-950/30 hover:scale-105 hover:shadow-sm duration-300 ease-in-out " +
        className
      }
      onClick={onClick}
    >
      <div className="absolute z-0 w-full h-full flex flex-col items-center justify-center">
        {icon}
      </div>
      <h2 className="relative z-10 text-4xl font-black text-white">{title}</h2>
      <p className="relative z-10 text-white/50 font-regular text-lg">
        {filename}
      </p>
    </button>
  );
}
