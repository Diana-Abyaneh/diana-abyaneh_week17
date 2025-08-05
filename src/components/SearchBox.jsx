import styles from "./SearchBox.module.css"

function SearchBox({ value, onChange }) {
  return (
    <section className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search contacts..."
        className={styles.search}
        value={value}
        onChange={onChange}
      />
    </section>
  );
}


export default SearchBox;