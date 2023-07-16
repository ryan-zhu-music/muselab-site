import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Head>
        <title>MuseLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
