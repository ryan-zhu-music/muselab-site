import "../styles/globals.css";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../utils/verify";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  const parseJwt = (token) => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const parsedToken = parseJwt(token);
    if (parsedToken) {
      if (parsedToken.exp * 1000 < Date.now()) {
        showError("Your session has expired. Please log in again.");
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? <Spinner /> : <></>}
      <div className={loading ? "hidden" : ""}>
        <ToastContainer />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
