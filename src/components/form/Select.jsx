import styles from "./Select.module.css";

function Select({ label, name, register, options = [], error }) {
  return (
    <div className={styles.selectGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select id={name} {...register(name)} className={styles.select}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
