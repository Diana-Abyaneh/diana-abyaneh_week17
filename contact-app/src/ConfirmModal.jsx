import React from 'react'

function ConfirmModal({message, onConfirm, onCancel}) {
  return (
    <div style={styles.overlay}>
        <div style={styles.modal}>
            <p>{message}</p>
            <div style={styles.buttons}>
                <button onClick={onConfirm} id='yes'>Yes</button>
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
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    minWidth: "320px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  buttons: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  }

};


export default ConfirmModal