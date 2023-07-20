import React from "react";

export default function Downloader({ title, filename, icon }) {
  const onClick = () => {
    let a = document.createElement("a");
    a.href = "/downloads/" + filename;
    a.download = filename;
    a.click();
  };
  return (
    <button
      className="relative flex flex-col items-center justify-center rounded-lg backdrop-blur-sm py-[2vh] ring-1 ring-slate-600 bg-blue-950/30 hover:scale-105 hover:shadow-sm duration-300 ease-in-out portrait:w-2/3 w-1/4"
      onClick={onClick}
    >
      <div className="absolute z-0 w-full h-full flex flex-col items-center justify-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-700/50">
        {icon}
      </div>
      <h2 className="relative z-10 text-base sm:text-lg md:text-xl xl:text-3xl font-black text-white">
        {title}
      </h2>
      <p className="relative z-10 text-white/50 font-regular text-xs sm:text-base xl:text-lg">
        {filename}
      </p>
    </button>
  );
}
