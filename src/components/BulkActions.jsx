import styles from "./BulkAction.module.css"

function BulkActions({
  allSelected,
  hasContacts,
  selectedCount,
  onToggleSelectAll,
  onBulkDelete,
}) {
  if (!hasContacts) return null;

  return (
    <section className={styles.bulkBtn}>
      <button onClick={onToggleSelectAll}>
        {allSelected ? "Unselect All" : "Select All"}
      </button>
      {selectedCount > 0 && (
        <button onClick={onBulkDelete}>Delete Contacts</button>
      )}
    </section>
  );
}

export default BulkActions;