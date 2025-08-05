import styles from "./FormField.module.css";

function FormField({
  label,
  name,
  type = "text",
  register,
  error,
  options = [],
}) {


  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      {type === "select" ? (
        <select id={name} {...register(name)} className={styles.select}>
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          {...register(name)}
          className={styles.input}
        />
      )}

      <p className={styles.error}>{error ? error.message : "\u00A0"}</p>
    </div>
  );
}

export default FormField;
