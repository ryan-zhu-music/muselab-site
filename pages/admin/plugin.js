import React, { useEffect, useState } from "react";
import Head from "next/head";
import Spinner from "../../components/spinner";
import { showError, showSuccess } from "../../utils/verify";
import Button from "../../components/button";
import { ToastContainer } from "react-toastify";
import Nav from "../../components/nav";

export default function Plugin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || !localStorage.getItem("isLoggedIn")) {
      window.location.href = "/login";
    }
    setAuthToken(accessToken);
    fetch("https://api.muselab.app/api/auth/roles", {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              if (!data.includes("ROLE_ADMIN")) {
                window.location.href = "/";
              } else setAuthenticated(true);
            })
            .catch((error) => {
              showError(error.message);
            });
        } else throw new Error("Not authenticated");
      })
      .catch((error) => {
        showError(error.message);
      });
  }, []);

  const uploadPlugin = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    let url = "upload";
    if (file.type === "application/zip") {
      url += "-zip";
    }
    fetch("https://api.muselab.app/api/plugin/" + url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      body: formData,
    })
      .then((response) => {
        const ok = response.ok;
        response
          .json()
          .then((data) => {
            if (!ok) {
              throw new Error(data.message);
            }
            showSuccess(data.message);
          })
          .catch((error) => {
            showError(error.message);
          });
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  return authenticated ? (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>MuseLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <Nav />
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-10 md:px-20 lg:px-32">
        <h1 className="text-3xl lg:text-4xl font-black text-white mb-10 mt-2">
          Upload Plugin
        </h1>
        <input
          type="file"
          accept=".zip"
          className="w-full h-12 px-4 py-2 mb-6 text-sm sm:text-base lg:text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <Button onClick={() => uploadPlugin(file)} text="Upload" />
      </main>
    </div>
  ) : (
    <div>
      <Spinner />
    </div>
  );
}
