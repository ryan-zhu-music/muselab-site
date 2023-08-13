import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Button from "../components/button";

export default function _404() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>MuseLab 404</title>
        <meta
          name="description"
          content="A free plugin for MuseScore 3 enabling real-time collaboration with
          other users."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="flex flex-col items-center justify-center w-full h-full bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-10 md:px-20 lg:px-32">
        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-bold">
          404
        </h1>
        <h2 className="text-2xl text-white font-bold mb-10">Page not found</h2>
        <Button onClick="/" text="Back to home" />
      </div>
    </div>
  );
}
