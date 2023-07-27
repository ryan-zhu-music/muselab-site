import React from "react";
import Button from "./button";

export default function Project({ project }) {
  return (
    <section className="relative flex flex-col items-center justify-center rounded-lg backdrop-blur-sm pt-6 pb-9 ring-1 ring-slate-600 bg-blue-950/30 hover:scale-105 hover:shadow-sm duration-300 ease-in-out min-w-[250px]">
      <h2 className="relative z-10 text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white">
        {project.name}
      </h2>
      <p className="relative z-10 text-white/50 font-regular text-xs sm:text-base xl:text-lg">
        Collaborators: {project.users.length}
      </p>
      <p className="relative z-10 text-white/50 font-regular text-xs sm:text-base xl:text-lg mb-2">
        Versions: {project.files.length}
      </p>
      <Button onClick={"/projects/" + project.projectId} text="Edit project" />
    </section>
  );
}
