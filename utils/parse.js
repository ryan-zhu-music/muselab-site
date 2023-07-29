import jwtDecode from "jwt-decode";

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

export default parseJwt;
