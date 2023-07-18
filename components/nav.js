import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "./button";
import Link from "next/link";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") == "true");
  }, []);

  return (
    <nav className="w-screen h-32 fixed top-0 flex flex-row justify-between items-center px-16">
      <Link href="/">
        <Image src="/assets/logo.png" alt="MuseLab" width={240} height={240} />
      </Link>
      <ul className="flex flex-row space-x-20">
        {isLoggedIn && (
          <li>
            <Link
              href="/dashboard"
              className="text-white font-black text-xl hover:text-teal-500 duration-300 ease-in-out"
            >
              Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link
            href="/about"
            className="text-white font-black text-xl hover:text-teal-500 duration-300 ease-in-out"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/download"
            className="text-white font-black text-xl hover:text-teal-500 duration-300 ease-in-out"
          >
            Download
          </Link>
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
          <Link
            href="/contact"
            className="text-white font-black text-xl hover:text-teal-500 duration-300 ease-in-out"
          >
            Contact
          </Link>
        </li>
      </ul>
      <div className="flex items-center justify-center h-full space-x-4">
        {isLoggedIn ? (
          <Button
            text="Log out"
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.setItem("isLoggedIn", false);
              if (window.location.pathname == "/dashboard")
                window.location.href = "/";
            }}
            type="primary"
          />
        ) : (
          <>
            <Button text="Log in" onClick="/login" type="secondary" />
            <Button text="Sign up" onClick="/signup" type="primary" />
          </>
        )}
      </div>
    </nav>
  );
}
