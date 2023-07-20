import "../styles/globals.css";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? <Spinner /> : <></>}
      <div className={loading ? "hidden" : ""}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
