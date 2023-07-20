import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "../../components/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../../utils/verify";
import { FaDownload, FaEdit, FaUserMinus } from "react-icons/fa";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState({});

  const removeUser = (index) => {};

  const downloadFile = (fileName) => {};

  const sortBy = (value) => {};

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "/login";
    }
    const token = localStorage.getItem("accessToken");
    fetch("https://api.muselab.app/api/projects/get/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              console.log(data);
              setProject(data);
            })
            .catch((error) => {
              if (id) showError(error.message);
            });
        } else {
          throw new Error("Failed to fetch project.");
        }
      })
      .catch((error) => {
        if (id) showError(error.message);
      });
  }, [id]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>MuseLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <ToastContainer />
      <main className="w-screen h-screen flex flex-row items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-10 md:px-20 lg:px-32 py-32 gap-5">
        <div className="w-1/2 h-full flex flex-col justify-between items-center gap-5">
          <div className="relative w-full h-1/3 flex flex-col gap-2 items-start justify-center rounded-xl backdrop-blur-sm py-5 px-8 ring-1 ring-slate-600 bg-blue-950/30 ">
            <p className="text-white font-regular text-sm sm:text-lg xl:text-xl">
              <b className="font-black">Title: </b>
              {project.name || "Untitled project"}
            </p>
            <p className="text-white font-regular text-sm sm:text-lg xl:text-xl">
              <b className="font-black">Creation date: </b>
              {project.date || "Unknown date"}
            </p>
            <p className="text-white font-regular text-sm sm:text-lg xl:text-xl">
              <b className="font-black">Genre: </b>
              {project.genre || "Unknown genre"}
            </p>
            <p className="text-white font-regular text-sm sm:text-lg xl:text-xl">
              <b className="font-black">Ensemble: </b>
              {project.ensemble || "Unknown ensemble"}
            </p>
            <button className="absolute top-5 right-6 text-2xl">
              <FaEdit className="text-white/50 hover:text-white duration-300 ease-in-out" />
            </button>
          </div>
          <div className="relative w-full h-2/3 flex flex-col gap-1 items-start justify-center rounded-xl backdrop-blur-sm py-5 px-8 ring-1 ring-slate-600 bg-blue-950/30 ">
            <h2 className="text-white font-black text-lg sm:text-xl xl:text-2xl">
              Contributors
            </h2>
            <p className="text-white/50 font-regular text-xs sm:text-sm lg:text-base xl:text-lg">
              Total: {project.users && project.users.length}
            </p>
            <ul className="flex w-full overflow-y-scroll space-y-2 flex-col bg-slate-500/60 rounded-xl px-7 py-5">
              {project.users &&
                project.users.map((user, index) => (
                  <li
                    key={index}
                    className="text-white w-full flex flex-row justify-between text-sm sm:text-lg xl:text-xl"
                  >
                    <p className="text-white font-black text-sm sm:text-lg xl:text-xl">
                      {user.username}
                    </p>
                    <button onClick={() => removeUser(index)}>
                      <FaUserMinus className="text-white/50 hover:text-white duration-300 ease-in-out" />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="relative w-1/2 h-full flex flex-col gap-1 items-start justify-start rounded-xl backdrop-blur-sm py-10 px-8 ring-1 ring-slate-600 bg-blue-950/30 ">
          <h2 className="text-white font-black text-lg sm:text-xl xl:text-2xl">
            Files
          </h2>
          <div className="w-full flex justify-between items-center mb-3">
            <p className="text-white/50 font-regular text-xs sm:text-sm lg:text-base xl:text-lg">
              Sort by:
              <select
                className="bg-transparent text-white/50 focus:outline-none "
                onChange={(e) => sortBy(e.target.value)}
              >
                <option value="alphabetical">Newest</option>
                <option value="date">Oldest</option>
                <option value="alphabetical">Name</option>
                <option value="date">User</option>
              </select>
            </p>
            <p className="text-white/50 font-regular text-right text-xs sm:text-sm lg:text-base xl:text-lg">
              Total: {project.files && project.files.length}
            </p>
          </div>
          <ul className="flex w-full overflow-y-scroll gap-2 flex-col bg-slate-500/60 rounded-xl px-5 py-5">
            {project.files &&
              project.files.map((file, index) => (
                <>
                  <li
                    className="relative py-4 min-h-[50px] px-2 w-full flex flex-col items-start justify-start"
                    key={index}
                  >
                    <h3 className="text-white font-black text-sm sm:text-lg xl:text-xl">
                      {file.title}
                    </h3>
                    <p className="text-white/50 ml-5 font-regular text-xs sm:text-sm lg:text-base xl:text-lg">
                      {file.date}
                    </p>
                    <p className="text-white/50 ml-5 font-regular text-xs sm:text-sm lg:text-base xl:text-lg">
                      {file.author}
                    </p>
                    <button
                      className="text-white/50 absolute top-1 right-4 ml-5 font-regular text-xs sm:text-base lg:text-lg xl:text-xl"
                      onClick={() => downloadFile(file.fileName)}
                    >
                      <FaDownload className="text-white/50 hover:text-white duration-300 ease-in-out" />
                    </button>
                  </li>
                  {index < project.files.length - 1 && (
                    <div className="w-full h-0.5 bg-white/20 my-1" />
                  )}
                </>
              ))}
          </ul>
        </div>
      </main>
      <footer className="w-screen h-20 fixed bottom-0 flex flex-row justify-center items-center bg-transparent">
        <p className="text-white/20 font-medium text-sm">
          Not affiliated with MuseScore.
        </p>
      </footer>
    </div>
  );
}
