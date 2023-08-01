import React, { useState, useEffect } from "react";
import Head from "next/head";
import Nav from "../../components/nav";
import Project from "../../components/project";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../../utils/verify";
import Button from "../../components/button";
import Modal from "../../components/modal";

export default function Projects() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectGenre, setProjectGenre] = useState("");
  const [projectEnsemble, setProjectEnsemble] = useState("");

  const createProject = () => {
    fetch("https://api.muselab.app/api/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: projectTitle || "Untitled",
        genre: projectGenre || "Any",
        ensemble: projectEnsemble || "Any",
      }),
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              window.location.href = "/projects/" + data.id;
            })
            .catch((error) => {
              window.location.href = "/projects";
              showError(error.message);
            });
        } else {
          throw new Error("Failed to create project.");
        }
      })
      .catch((error) => {
        window.location.href = "/projects";
        showError(error.message);
      });
  };

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
                setProjects(data);
              })
              .catch((error) => {
                showError(error.message);
              });
          } else {
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
        <h1 className="text-lg md:text-xl lg:text-2xl font-black text-white mb-5 text-center">
          Welcome to MuseLab{username && ", " + username}!
        </h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 text-center">
          Your <b className="text-teal-400">projects</b>
        </h2>
        <Modal
          preview={<Button text="Create a new project" />}
          content={
            <div className="z-50 px-10 py-8 flex flex-col items-center justify-center gap-5 ring-1 ring-slate-600 bg-blue-950/30 rounded-lg">
              <h1 className="text-2xl font-black text-white text-center">
                Create a new project
              </h1>
              <input
                type="text"
                placeholder="Title"
                className="w-full h-10 px-3 rounded-lg bg-slate-900/60 text-white/70 focus:outline-none focus:ring-1 focus:ring-slate-600"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Genre"
                className="w-full h-10 px-3 rounded-lg bg-slate-900/60 text-white/70 focus:outline-none focus:ring-1 focus:ring-slate-600"
                value={projectGenre}
                onChange={(e) => setProjectGenre(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ensemble"
                className="w-full h-10 px-3 rounded-lg bg-slate-900/60 text-white/70 focus:outline-none focus:ring-1 focus:ring-slate-600"
                value={projectEnsemble}
                onChange={(e) => setProjectEnsemble(e.target.value)}
              />
              <Button text="Create" type="primary" onClick={createProject} />
            </div>
          }
          showModal={showModal}
          setShowModal={setShowModal}
          name="createProject"
        />
        {projects.length === 0 && (
          <p className="text-white/70 text-center mt-10">
            You don&apos;t have any projects yet.{" "}
          </p>
        )}
        <div className="flex flex-row flex-wrap justify-center items-start gap-5 mt-8">
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
