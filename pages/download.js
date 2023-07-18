import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Downloader from "../components/downloader";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { MdFolderZip } from "react-icons/md";

const downloads = [
  {
    title: "Windows",
    filename: "muselab-win.exe",
    icon: <FaWindows className="text-9xl text-slate-700/50" />,
  },
  {
    title: "MacOS",
    filename: "muselab-mac",
    icon: <FaApple className="text-9xl text-slate-700/50" />,
  },
  {
    title: "Linux",
    filename: "muselab-linux",
    icon: <FaLinux className="text-9xl text-slate-700/50" />,
  },
];

export default function Download() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>MuseLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-60">
        <h1 className="text-7xl font-black text-white mb-6">
          Download MuseLab
        </h1>
        <p className="w-full text-2xl font-normal text-white text-center px-48">
          Select the right <b className="text-rose-400">installer</b> for your{" "}
          <b className="text-indigo-300">machine</b>.
        </p>
        <p className="w-full text-2xl font-normal text-white text-center px-48">
          <b className="text-purple-300">Double-click</b> to run the{" "}
          <b className="text-pink-300">executable</b> to automatically install
          MuseLab.
        </p>
        <div className="flex flex-row space-x-10 mt-7">
          {downloads.map((download) => (
            <Downloader
              title={download.title}
              filename={download.filename}
              icon={download.icon}
              key={download.title}
            />
          ))}
        </div>
        <p className="w-full text-2xl font-normal text-white text-center px-48 my-6">
          Or, if you prefer to install MuseLab{" "}
          <b className="text-orange-300">manually:</b>
        </p>
        <Downloader
          title="Zip file"
          filename="MuseLab.zip"
          icon={<MdFolderZip className="text-9xl text-slate-700/50" />}
          className="w-96 h-28"
        />
      </main>
      <footer className="w-screen h-32 fixed bottom-0 flex flex-row justify-center items-center bg-transparent">
        <p className="text-white/20 font-medium text-sm">
          Not affiliated with MuseScore.
        </p>
      </footer>
    </div>
  );
}
