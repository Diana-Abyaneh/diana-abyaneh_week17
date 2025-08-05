import { useState } from "react";

export function useNotifications(timeout = 3000) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), timeout);
  };

  const showError = (messages) => {
    const errs = Array.isArray(messages) ? messages : [messages];
    setErrorMessages(errs);
    setTimeout(() => setErrorMessages([]), timeout);
  };

  return {
    successMessage,
    errorMessages,
    showSuccess,
    showError,
  };
}
