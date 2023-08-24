import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../components/spinner";
import Nav from "../../components/nav";
import Button from "../../components/button";
import { showError } from "../../utils/verify";
import Head from "next/head";

export default function Verify() {
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState("Loading");
  const [status, setStatus] = useState(0);

  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      fetch("https://api.muselab.app/api/auth/verify/" + token, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          res
            .json()
            .then((data) => {
              setLoading(false);
              setStatus(data.status);
              setHeader(data.message);
            })
            .catch((err) => {
              showError(err.message);
            });
        })
        .catch((err) => {
          showError(err.message);
        });
    }
  }, [token]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>Verify MuseLab Email</title>
        <meta
          name="description"
          content="A free plugin for MuseScore 3 enabling real-time collaboration with
          other users."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/assets/background.png')] bg-no-repeat bg-cover px-10 md:px-20 lg:px-32">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-10">
          {header}
        </h1>
        {loading && <Spinner />}
        {status === 200 && (
          <Button onClick="/login" text="Log into your new account" />
        )}
      </main>
    </div>
  );
}
