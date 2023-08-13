import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyPassword, showError, showSuccess } from "../utils/verify";

export default function Reset() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (verifyPassword(password, confirm)) {
      fetch("https://api.muselab.app/api/auth/reset_password/" + token, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Invalid token");
          }
          response.json().then((data) => {
            showSuccess("Password reset successfully!");
            setTimeout(() => {
              window.location.href = "/login";
            }, 5000);
          });
        })
        .catch((error) => {
          showError(error.message);
        });
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>Reset Muselab Password</title>
        <meta
          name="description"
          content="A free plugin for MuseScore 3 enabling real-time collaboration with
          other users."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <ToastContainer />
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-60">
        <form
          className="flex flex-col items-center justify-around p-10 min-w-[30vw] min-h-[30vh] rounded-lg ring-1 backdrop-blur-sm ring-slate-600 bg-blue-950/30"
          onSubmit={onSubmit}
        >
          <h1 className="text-4xl font-black text-white mb-4 mt-2">
            Reset password
          </h1>
          <p className="text-white/50 font-medium text-base mb-10">
            New password
          </p>
          <input
            type="password"
            placeholder="New password"
            className="w-full h-12 px-4 py-2 mb-6 text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={true}
          />
          <p className="text-white/50 font-medium text-base mb-10">
            Confirm password
          </p>
          <input
            type="password"
            placeholder="New password"
            className="w-full h-12 px-4 py-2 mb-6 text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setConfirm(e.target.value)}
            value={confirm}
            required={true}
          />
          <button
            type="submit"
            className="w-full h-12 px-4 py-2 mt-5 text-lg font-black ring-1 backdrop-blur-sm ring-teal-500/90 bg-teal-500/90 rounded-lg text-white font-regular focus:outline-none hover:bg-teal-700/90 duration-300 ease-in-out"
          >
            Reset password
          </button>
          <p className="text-white/50 font-medium text-base mt-7">
            Back to{" "}
            <Link
              href="/login"
              className="text-teal-500 hover:text-teal-600 duration-300 ease-in-out underline"
            >
              login
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
