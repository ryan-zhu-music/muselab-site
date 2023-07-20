import React, { useRef, useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import { FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastProps = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 5000,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  style: {
    fontFamily: "Nunito Sans",
    opacity: 0.9,
    background: "#1F2937",
    color: "#F9FAFB",
  },
};

export default function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then((res) => {
        toast.success("Message sent!", toastProps);
        setSent(true);
      })
      .catch((err) => {
        toast.error("Message failed to send.", toastProps);
      });
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>MuseLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <ToastContainer />
      <main className="w-screen h-screen flex portrait:flex-col landscape:flex-row items-center portraif:justify-start landscape:justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-10 md:px-20 lg:px-32">
        <div className="portrait:mt-20 landscape:w-1/2 portrait:w-full py-7 px-5 portrait:space-y-2 landscape:space-y-5 flex flex-col landscape:items-start justify-start portrait:items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white text-center landscape:mb-5">
            Contact Us
          </h1>
          <p className="text-sm md:text-lg lg:text-xl xl:text-2xl font-normal text-white landscape:text-left portrait:text-center">
            Fill in your <b className="text-amber-300">information</b> and{" "}
            <b className="text-green-400">message</b>, and we&apos;ll{" "}
            <b className="text-fuchsia-400">get back to you</b>.
          </p>
          <p className="landscape:pt-5 text-sm md:text-lg lg:text-xl xl:text-2xl font-normal text-white text-left">
            Or, email us at:
          </p>
          <a
            href="mailto:admin@muselab.app"
            className="hover:text-teal-400/80 duration-300 ease-in-out flex text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-medium items-center justify-start"
          >
            <FaEnvelope className="mr-3" /> admin@muselab.app
          </a>
        </div>
        <div className="portrait:w-full landscape:w-1/2 flex flex-col items-center justify-center">
          <form
            className="flex flex-col w-full items-center justify-between p-6 md:p-10 min-w-[30vw] space-y-3 rounded-lg ring-1 backdrop-blur-sm ring-slate-600 bg-blue-950/30"
            onSubmit={onSubmit}
            ref={form}
          >
            <input
              type="text"
              name="name"
              disabled={sent}
              placeholder="Name"
              className="w-full px-4 py-2 text-sm md:text-base xl:text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 disabled:bg-slate-500/60 disabled:text-white/80 duration-300 ease-in-out"
            />
            <input
              type="email"
              name="email"
              disabled={sent}
              placeholder="Email"
              className="w-full px-4 py-2 text-sm md:text-base xl:text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 disabled:bg-slate-500/60 disabled:text-white/80 duration-300 ease-in-out"
            />
            <input
              type="text"
              name="subject"
              disabled={sent}
              placeholder="Subject"
              className="w-full px-4 py-2 text-sm md:text-base xl:text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 disabled:bg-slate-500/60 disabled:text-white/80 duration-300 ease-in-out"
            />
            <textarea
              name="message"
              disabled={sent}
              placeholder="Message"
              className="w-full px-4 py-2 text-sm md:text-base xl:text-lg ring-1 backdrop-blur-sm ring-slate-600 bg-slate-700/40 rounded-lg text-white placeholder:text-slate-400 font-regular focus:outline-none hover:bg-slate-600/60 focus:bg-slate-600/60 disabled:bg-slate-500/60 disabled:text-white/80 duration-300 ease-in-out resize-none"
            />
            <button
              type="submit"
              disabled={sent}
              className="w-full px-4 py-2 mt-5 text-sm md:text-base xl:text-lg font-black ring-1 backdrop-blur-sm ring-teal-500/90 bg-teal-500/90 rounded-lg text-white font-regular focus:outline-none hover:bg-teal-700/90 disabled:bg-teal-800/70 disabled:ring-teal-800/70 disabled:text-white/80 duration-300 ease-in-out"
            >
              {sent ? "Message sent!" : "Send message"}
            </button>
          </form>
        </div>
      </main>
      <footer className="w-screen h-20 fixed bottom-0 flex flex-row justify-center items-center bg-transparent">
        <p className="text-white/20 font-medium text-sm">
          Not affiliated with MuseScore.
        </p>
      </footer>
    </div>
  );
}
