import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  verifyUsername,
  verifyEmail,
  verifyPassword,
  showError,
} from "../utils/verify";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      verifyUsername(username) &&
      verifyEmail(email) &&
      verifyPassword(password, passwordConfirm)
    ) {
      fetch("https://api.muselab.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      })
        .then((res) => {
          let ok = res.ok;
          res
            .json()
            .then((data) => {
              if (!ok) {
                throw new Error(data.message);
              }
              fetch("https://api.muselab.app/api/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username,
                  password,
                }),
              })
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    showError("Failed to log in.");
                    localStorage.setItem("isLoggedIn", false);
                    setTimeout(() => {
                      window.location.href = "/login";
                    }, 5000);
                  }
                })
                .then((data) => {
                  localStorage.setItem("accessToken", data.accessToken);
                  localStorage.setItem("userId", data.id);
                  localStorage.setItem("username", data.username);
                  localStorage.setItem("email", data.email);
                  localStorage.setItem("isLoggedIn", true);
                  window.location.href = "/dashboard";
                })
                .catch((error) => {
                  showError(error.message);
                  localStorage.setItem("isLoggedIn", false);
                });
            })
            .catch((err) => {
              showError(err.message);
              localStorage.setItem("isLoggedIn", false);
            });
        })
        .catch((err) => {
          showError(err.message);
          localStorage.setItem("isLoggedIn", false);
        });
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>MuseLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <ToastContainer />
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-60">
        <form
          className="flex flex-col items-center justify-around px-10 py-14 min-w-[30vw] min-h-[60vh] rounded-lg ring-1 backdrop-blur-sm ring-slate-600 bg-blue-950/30"
          onSubmit={onSubmit}
        >
          <h1 className="text-4xl font-black text-white mb-10 mt-2">
            Create an account
          </h1>
          <input
            type="text"
            placeholder="Username"
            className="w-full h-12 px-4 py-2 mb-6 text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full h-12 px-4 py-2 mb-6 text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 px-4 py-2 mb-6 text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full h-12 px-4 py-2 mb-6 text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
          <button
            type="submit"
            className="w-full h-12 px-4 py-2 mt-5 text-lg font-black ring-1 backdrop-blur-sm ring-teal-500/90 bg-teal-500/90 rounded-lg text-white font-regular focus:outline-none hover:bg-teal-700/90 duration-300 ease-in-out"
          >
            Sign up
          </button>
          <p className="text-white/50 font-medium text-base mt-7">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-teal-500 hover:text-teal-600 duration-300 ease-in-out underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </main>
      <footer className="w-screen h-32 fixed bottom-0 flex flex-row justify-center items-center bg-transparent">
        <p className="text-white/20 font-medium text-sm">
          Not affiliated with MuseScore.
        </p>
      </footer>
    </div>
  );
}
