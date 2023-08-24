import { toast } from "react-toastify";

export const verifyUsername = (username) => {
  if (!username) {
    showError("Username cannot be empty");
    return false;
  }
  if (username.length < 2 || username.length > 20) {
    showError("Username must have between 2-20 characters");
    return false;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    showError("Username may only contain letters and numbers");
    return false;
  }
  return true;
};

export const verifyEmail = (email) => {
  if (!email) {
    showError("Email cannot be empty");
    return false;
  }
  if (
    !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
      email
    )
  ) {
    showError("Please enter a valid email address");
    return false;
  }
  return true;
};

export const verifyPassword = (password, passwordConfirm) => {
  if (!password) {
    showError("Password cannot be empty");
    return false;
  }
  if (password.length < 8 || password.length > 32) {
    showError("Password must have between 8-32 characters");
    return false;
  }
  if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    showError("Password must contain at least one letter and one number");
    return false;
  }
  if (password !== passwordConfirm) {
    showError("Passwords do not match");
    return false;
  }
  return true;
};

export const showError = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
    pauseOnHover: false,
    draggable: false,
    style: {
      fontFamily: "Nunito Sans",
      opacity: 0.9,
      background: "#1F2937",
      color: "#F9FAFB",
    },
  });
};

export const showSuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
    pauseOnHover: false,
    draggable: false,
    style: {
      fontFamily: "Nunito Sans",
      opacity: 0.9,
      background: "#1F2937",
      color: "#F9FAFB",
    },
  });
};

export const showWarning = (message) => {
  toast.warning(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
    pauseOnHover: false,
    draggable: false,
    style: {
      fontFamily: "Nunito Sans",
      opacity: 0.9,
      background: "#1F2937",
      color: "#F9FAFB",
    },
  });
};
