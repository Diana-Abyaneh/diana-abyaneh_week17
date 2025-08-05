import styles from "./Input.module.css";

function Input({ label, name, type = "text", register }) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input id={name} type={type} {...register(name)} className={styles.input} />
    </div>
  );
}

export default Input;
