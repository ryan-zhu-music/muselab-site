import React, { useEffect, useState } from "react";
import Head from "next/head";
import Spinner from "../../components/spinner";
import { showError, showSuccess } from "../../utils/verify";
import { ToastContainer } from "react-toastify";
import Nav from "../../components/nav";
import dynamic from "next/dynamic";

const DynamicReactJson = dynamic(() => import("../../components/jsonpreview"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function Plugin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [stats, setStats] = useState(null);

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
              } else {
                setAuthenticated(true);
                getStats();
              }
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

  const getStats = () => {
    fetch("https://api.muselab.app/api/stats/all", {
      method: "GET",
      headers: {
        authorization: `Bearer ${
          authToken || localStorage.getItem("accessToken")
        }`,
      },
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              setStats(data);
            })
            .catch((error) => {
              showError(error.message);
            });
        } else {
          throw new Error("Something went wrong");
        }
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
      <main className="w-screen h-screen flex flex-col items-center justify-start bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-10 md:px-20 lg:px-32 py-28">
        <h1 className="text-3xl lg:text-4xl font-black text-white mb-10 mt-2">
          Admin Stats
        </h1>
        {stats ? <DynamicReactJson json={stats} /> : <Spinner />}
      </main>
    </div>
  ) : (
    <div>
      <Spinner />
    </div>
  );
}
