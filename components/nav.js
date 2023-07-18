import Image from "next/image";
import React from "react";
import Button from "./button";

export default function Nav() {
  return (
    <nav className="w-screen h-32 fixed top-0 flex flex-row justify-between items-center px-16">
      <a href="/">
        <Image src="/assets/logo.png" alt="MuseLab" width={240} height={240} />
      </a>
      <ul className="flex flex-row space-x-20">
        <li>
          <a
            href="/about"
            className="text-white font-black text-xl hover:text-teal-500 duration-300 ease-in-out"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/download"
            className="text-white font-black text-xl hover:text-teal-500 duration-300 ease-in-out"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </li>
        <li>
          <a
            href="https://discord.gg/SKkwy6uDHP"
            className="text-white font-black text-xl hover:text-teal-500 duration-300 ease-in-out"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="text-white font-black text-xl hover:text-teal-500 duration-300 ease-in-out"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </li>
      </ul>
      <div className="flex items-center justify-center h-full space-x-4">
        <Button text="Log in" onClick="/login" type="secondary" />
        <Button text="Sign up" onClick="/signup" type="primary" />
      </div>
    </nav>
  );
}
