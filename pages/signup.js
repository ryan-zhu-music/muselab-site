import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/spinner";

import {
  verifyUsername,
  verifyEmail,
  verifyPassword,
  showError,
  showWarning,
} from "../utils/verify";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

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
          res
            .json()
            .then((data) => {
              console.log(data);
              localStorage.setItem("accessToken", data.accessToken);
              localStorage.setItem("userId", data.id);
              localStorage.setItem("username", data.username);
              localStorage.setItem("email", data.email);
              localStorage.setItem("isLoggedIn", true);
              setLoading(true);
              showWarning("Please check your email to verify your account.");
              setTimeout(() => {
                window.location.href = "/login";
              }, 5000);
            })
            .catch((err) => {
              showError(err.message);
            });
        })
        .catch((err) => {
          showError(err.message);
          localStorage.setItem("isLoggedIn", false);
        });
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>MuseLab Sign-up</title>
        <meta
          name="description"
          content="A free plugin for MuseScore 3 enabling real-time collaboration with
          other users."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <ToastContainer />
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-10 md:px-20 lg:px-32">
        <form
          className="flex flex-col items-center justify-evenly space-y-4 p-6 lg:p-10 min-w-[30vw] min-h-[50vh] max-h-[70vh] rounded-lg ring-1 backdrop-blur-sm ring-slate-600 bg-blue-950/30"
          onSubmit={onSubmit}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-black text-white mt-2 mb-4">
            Create an account
          </h1>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 text-sm sm:text-base lg:text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 text-sm sm:text-base lg:text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 text-sm sm:text-base lg:text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-2 text-sm sm:text-base lg:text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 mt-5 text-sm sm:text-base lg:text-lg font-black ring-1 backdrop-blur-sm ring-teal-500/90 bg-teal-500/90 rounded-lg text-white font-regular focus:outline-none hover:bg-teal-700/90 duration-300 ease-in-out"
          >
            Sign up
          </button>
          <p className="text-white/50 font-medium text-center text-xs sm:text-sm md:text-base mt-7">
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
      <footer className="w-screen h-20 fixed bottom-0 flex flex-row justify-center items-center bg-transparent">
        <p className="text-white/20 font-medium text-sm">
          Not affiliated with MuseScore.
        </p>
      </footer>
    </div>
  );
}
