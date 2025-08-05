import styles from "./Input.module.css";

function Input({ label, name, register, error, type = "text", ...rest }) {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.inputWrapper}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <input
          id={name}
          type={type}
          {...register(name)}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          {...rest}
        />
      </div>
      <p className={styles.error}>{error ? error.message : "\u00A0"}</p>
    </div>
  );
}

export default Input;
