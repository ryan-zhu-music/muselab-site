import React, { useState, useEffect } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Project from "../components/project";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../utils/verify";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "/login";
    } else {
      setUsername(localStorage.getItem("username"));
      setToken(localStorage.getItem("accessToken"));
      fetch("https://api.muselab.app/api/projects/list", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
        .then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                console.log(data);
                setProjects(data);
              })
              .catch((error) => {
                showError(error.message);
              });
          } else {
            console.log(response);
            throw new Error("Failed to fetch projects.");
          }
        })
        .catch((error) => {
          showError(error.message);
        });
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>MuseLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <ToastContainer />
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-10 md:px-20 lg:px-32">
        <h1 className="text-2xl font-black text-white mb-5 text-center">
          Welcome to MuseLab{username && ", " + username}!
        </h1>
        <h2 className="text-5xl font-black text-white mb-10 text-center">
          Your <b className="text-teal-400">projects</b>
        </h2>
        <div className="flex flex-row flex-wrap justify-center items-start gap-5">
          {projects.map((project, index) => (
            <Project key={index} project={project} />
          ))}
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
