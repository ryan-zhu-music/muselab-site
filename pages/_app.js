import "../styles/globals.css";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../utils/verify";
import parseJwt from "../utils/parse";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const parsedToken = parseJwt(token);
    if (parsedToken) {
      if (parsedToken.exp * 1000 < Date.now()) {
        showError("Your session has expired. Please log in again.");
        localStorage.clear();
      }
    } else {
      showError("Your session has expired. Please log in again.");
      localStorage.clear();
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
