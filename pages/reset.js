import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Link from "next/link";

export default function Reset() {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, password });
    // TO-DO: Add input verification, error display, api call
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>MuseLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-60">
        <form
          className="flex flex-col items-center justify-around p-10 min-w-[30vw] min-h-[30vh] rounded-lg ring-1 backdrop-blur-sm ring-slate-600 bg-blue-950/30"
          onSubmit={onSubmit}
        >
          <h1 className="text-4xl font-black text-white mb-4 mt-2">
            Password recovery
          </h1>
          <p className="text-white/50 font-medium text-base mb-10">
            Enter your email address below and we&apos;ll send you a link to
            reset your password.
          </p>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full h-12 px-4 py-2 mb-6 text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={true}
          />
          <button
            type="submit"
            className="w-full h-12 px-4 py-2 mt-5 text-lg font-black ring-1 backdrop-blur-sm ring-teal-500/90 bg-teal-500/90 rounded-lg text-white font-regular focus:outline-none hover:bg-teal-700/90 duration-300 ease-in-out"
          >
            Sign up
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
