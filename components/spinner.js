import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <ScaleLoader color="#4FD1C5" />
      <h1 className="text-4xl font-black text-white mt-7 text-center">
        Loading...
      </h1>
    </div>
  );
}
