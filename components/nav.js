import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "./button";
import Link from "next/link";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { HiMenu } from "react-icons/hi";

export default function Nav() {
  if (typeof window === "undefined") return null;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { width, height } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") == "true");
  }, []);

  if (width < 900) {
    return (
      <nav className="w-screen pt-5 fixed top-0 flex flex-row justify-between items-center px-12">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="MuseLab"
            width={200}
            height={200}
            className="relative z-20"
          />
        </Link>
        <button
          className="w-20 h-20 -right-6 flex items-center justify-center text-white text-3xl relative z-20"
          onClick={() => setOpen(!open)}
        >
          <HiMenu />
        </button>
        <div
          className={
            "duration-500 ease-in-out absolute z-10 top-0 left-0 overflow-hidden " +
            (open ? "max-h-[600px]" : "max-h-0")
          }
        >
          <ul
            className={
              "backdrop-blur-lg bg-blue-950/50 relative z-10 pt-28 pb-16 px-12 text-base font-black text-white w-screen flex-col space-y-6 items-start justify-start"
            }
          >
            <li>
              <div className="h-[2px] bg-slate-400/50 z-20" />
            </li>
            {!isLoggedIn && (
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-teal-500 duration-300 ease-in-out"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/about"
                className="hover:text-teal-500 duration-300 ease-in-out"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/download"
                className="hover:text-teal-500 duration-300 ease-in-out"
              >
                Download
              </Link>
            </li>
            <li>
              <a
                href="https://discord.gg/SKkwy6uDHP"
                className="hover:text-teal-500 duration-300 ease-in-out"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-teal-500 duration-300 ease-in-out"
              >
                Contact
              </Link>
            </li>
            <li className="w-1/3">
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
                <Button text="Log in" onClick="/login" type="secondary" />
              )}
            </li>
            {!isLoggedIn && (
              <li className="w-1/3">
                <Button text="Sign up" onClick="/signup" type="primary" />
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-screen h-32 fixed top-0 flex flex-row justify-between items-center px-16">
      <Link href="/">
        <Image src="/assets/logo.png" alt="MuseLab" width={240} height={240} />
      </Link>
      <ul className="flex flex-row w-3/5 text-sm lg:text-lg font-black text-white justify-evenly">
        {!isLoggedIn && (
          <li>
            <Link
              href="/dashboard"
              className="hover:text-teal-500 duration-300 ease-in-out"
            >
              Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link
            href="/about"
            className="hover:text-teal-500 duration-300 ease-in-out"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/download"
            className="hover:text-teal-500 duration-300 ease-in-out"
          >
            Download
          </Link>
        </li>
        <li>
          <a
            href="https://discord.gg/SKkwy6uDHP"
            className="hover:text-teal-500 duration-300 ease-in-out"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-teal-500 duration-300 ease-in-out"
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
