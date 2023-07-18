import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ username, email, password, passwordConfirm });
    // TO-DO: Add signup verification, error display, api call
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
            required={true}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 px-4 py-2 mb-6 text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={true}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 px-4 py-2 mb-6 text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={true}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full h-12 px-4 py-2 mb-6 text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 duration-300 ease-in-out"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            required={true}
          />
          <button
            type="submit"
            className="w-full h-12 px-4 py-2 mt-5 text-lg font-black ring-1 backdrop-blur-sm ring-teal-500/90 bg-teal-500/90 rounded-lg text-white font-regular focus:outline-none hover:bg-teal-700/90 duration-300 ease-in-out"
          >
            Sign up
          </button>
          <p className="text-white/50 font-medium text-base mt-7">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-teal-500 hover:text-teal-600 duration-300 ease-in-out underline"
            >
              Log in
            </a>
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
