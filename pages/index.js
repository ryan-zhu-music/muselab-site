import React from "react";
import Head from "next/head";
import Button from "../components/button";
import { IoLogoDiscord } from "react-icons/io5";
import Nav from "../components/nav";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>MuseLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-60">
        <h1 className="text-7xl font-black text-white text-center mb-5">
          Music collaboration made easy.
        </h1>
        <h2 className="w-full text-3xl font-normal text-white text-center px-48">
          Create <b className="text-fuchsia-400">incredible music</b> together
          in <b className="text-lime-300">real-time</b> with MuseLab, a{" "}
          <b className="text-teal-400">free plugin</b> developed for{" "}
          <b className="text-blue-300">MuseScore3</b>.
        </h2>
        <div className="flex flex-row space-x-5 mt-10">
          <Button text="Download" onClick="/download" type="primary" />
          <Button
            text={
              <p className="flex items-center justify-between">
                Join our Discord
                <IoLogoDiscord className="ml-2 text-2xl" />
              </p>
            }
            onClick="https://discord.gg/SKkwy6uDHP"
            type="secondary"
          />
        </div>
      </main>
      <footer className="w-screen h-32 fixed bottom-0 flex flex-row justify-center items-center bg-transparent">
        <p className="text-white/20 font-medium text-sm">
          Not affiliated with MuseScore.
        </p>
      </footer>
    </div>
  );
}
