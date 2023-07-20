import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "../../components/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../../utils/verify";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState({});

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
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-10 md:px-20 lg:px-32">
        <h1 className="text-5xl font-black text-white mb-5 text-center">
          {project.name}
        </h1>
      </main>
      <footer className="w-screen h-20 fixed bottom-0 flex flex-row justify-center items-center bg-transparent">
        <p className="text-white/20 font-medium text-sm">
          Not affiliated with MuseScore.
        </p>
      </footer>
    </div>
  );
}
