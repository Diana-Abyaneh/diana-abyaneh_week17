import React from 'react'

function ConfirmModal( message, onConfirm, onCancel) {
  return (
    <div style={styles.overlay}>
        <div style={styles.modal}>
            <p>{message}</p>
            <div style={styles.buttons}>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    minWidth: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.25)",
  },
  buttons: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
  }
};

export default ConfirmModal