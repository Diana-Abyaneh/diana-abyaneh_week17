function Notifications() {
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showError = (messages) => {
    setErrorMessages(messages);
    setTimeout(() => setErrorMessages([]), 3000);
  };
  return <div></div>;
}

export default Notifications;
