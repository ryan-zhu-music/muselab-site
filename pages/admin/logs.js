import React, { useState, useEffect } from "react";
import Head from "next/head";
import Spinner from "../../components/spinner";
import Nav from "../../components/nav";
import { ToastContainer } from "react-toastify";

import { showError } from "../../utils/verify";
import Button from "../../components/button";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const [content, setContent] = useState("");
  const [query, setQuery] = useState("");

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

  useEffect(() => {
    if (authenticated) {
      list();
    }
  }, [authenticated]);

  const list = () => {
    fetch("https://api.muselab.app/api/logging/list", {
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
              console.log(data);
              setContent(JSON.stringify(data, null, 2));
            })
            .catch((error) => {
              showError(error.message);
            });
        } else throw new Error("Not authenticated");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  const search = () => {
    fetch("https://api.muselab.app/api/logging/search", {
      method: "POST",
      headers: {
        authorization: `Bearer ${
          authToken || localStorage.getItem("accessToken")
        }`,
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              setContent(JSON.stringify(data, null, 2));
            })
            .catch((error) => {
              showError(error.message);
            });
        } else throw new Error("Not authenticated");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  const id = () => {
    fetch("https://api.muselab.app/api/logging/get/" + query, {
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
              setContent(JSON.stringify(data, null, 2));
            })
            .catch((error) => {
              showError(error.message);
            });
        } else throw new Error("Not authenticated");
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
      <Nav />
      <ToastContainer />
      <main className="flex flex-col items-center justify-center w-full h-full bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-10 md:px-20 lg:px-32">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-50 mb-10">
          Logs
        </h1>
        <div className="w-full flex flex-row flex-wrap gap-3 items-center justify-center">
          <input
            type="text"
            className="h-10 lg:h-12 px-3 rounded-lg bg-slate-600/80 text-white/70 focus:outline-none focus:ring-1 focus:ring-slate-600"
            placeholder="Query/Id"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={list} text="List" />
          <Button onClick={search} text="Search" />
          <Button onClick={id} text="Id" />
        </div>
        <div className="w-full rounded-xl bg-slate-600/80 text-slate-50 text-base mt-10 p-7">
          {content}
        </div>
      </main>
    </div>
  ) : (
    <div>
      <Spinner />
    </div>
  );
}
