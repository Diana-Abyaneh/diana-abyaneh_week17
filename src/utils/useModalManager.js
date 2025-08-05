import { useState } from "react";

export default function useModalManager() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingEditContact, setPendingEditContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  return {
    modalVisible,
    setModalVisible,
    pendingEditContact,
    setPendingEditContact,
    contactToDelete,
    setContactToDelete,
    isBulkDelete,
    setIsBulkDelete,
  };
}
