import "../styles/globals.css";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError } from "../utils/verify";
import jwtDecode from "jwt-decode";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  const parseJwt = (token) => {
    if (!token) {
      return;
    }
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
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
