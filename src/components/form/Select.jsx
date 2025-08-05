import styles from "./Select.module.css";

function Select({ label, name, register, error, options = [] }) {
  return (
    <div className={styles.selectGroup}>
      <div className={styles.selectWrapper}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <select
          id={name}
          {...register(name)}
          className={`${styles.select} ${error ? styles.selectError : ""}`}
        >
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <p className={styles.error}>{error ? error.message : "\u00A0"}</p>
    </div>
  );
}

export default Select;
