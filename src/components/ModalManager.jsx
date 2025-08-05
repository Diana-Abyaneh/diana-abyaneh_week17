import ConfirmModal from "./ConfirmModal";

function ModalManager({
  modalVisible,
  pendingEditContact,
  contactToDelete,
  isBulkDelete,
  onEditConfirm,
  onEditCancel,
  onDeleteConfirm,
  onDeleteCancel,
  selectedCount,
}) {
  if (!modalVisible) return null;

  if (pendingEditContact) {
    return (
      <ConfirmModal
        message={`Are you sure you want to edit ${pendingEditContact.firstName}?`}
        onConfirm={onEditConfirm}
        onCancel={onEditCancel}
      />
    );
  }

  if (contactToDelete || isBulkDelete) {
    const message = isBulkDelete
      ? `Are you sure you want to delete ${selectedCount} selected contacts?`
      : `Are you sure you want to delete ${contactToDelete.firstName}?`;

    return (
      <ConfirmModal
        message={message}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
      />
    );
  }

  return null;
}

export default ModalManager;
