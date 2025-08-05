import { useState, useEffect } from "react";
import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import ContactForm from "./forms/ContactForm";
import ContactList from "./ContactList";
import ConfirmModal from "./ConfirmModal";
import styles from "./HomePage.module.css";
import useModalManager from "../utils/useModalManager";
import SearchBox from "./SearchBox";

function HomePage() {
  const {
    setContacts,
    setEditableContact,
    successMessage,
    errorMessages,
    search,
    setSearch,
    selectedContacts,
    setSelectedContacts,
    deleteContact,
    deleteBulkContacts,
    filteredContacts,
  } = useContext(ContactContext);

  const {
    modalVisible,
    setModalVisible,
    pendingEditContact,
    setPendingEditContact,
    contactToDelete,
    setContactToDelete,
    isBulkDelete,
    setIsBulkDelete,
  } = useModalManager();

  const [isLoaded, setIsLoaded] = useState(false);

  const handleEditContact = (contact) => {
    setPendingEditContact(contact);
    setModalVisible(true);
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setModalVisible(true);
  };

  const handleBulkDeleteClick = () => {
    setIsBulkDelete(true);
    setModalVisible(true);
  };

  const handleToggleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length)
      setSelectedContacts([]);
    else {
      const allVisibleIds = filteredContacts.map((contact) => contact.id);
      setSelectedContacts(allVisibleIds);
    }
  };

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
    setIsLoaded(true);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Contact App</h1>
      <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />

      <hr />
      <br />

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      {errorMessages.length > 0 &&
        errorMessages.map((message, index) => (
          <div
            key={index}
            className={styles.errorMessage}
            style={{ top: `${20 + index * 60}px` }}
          >
            {message}
          </div>
        ))}

      <ContactForm />

      <ContactList
        contacts={filteredContacts}
        onEditContact={handleEditContact}
        onRequestDelete={handleDeleteClick}
      />
      <section className={styles.bulkBtn}>
        {filteredContacts.length > 0 && (
          <div>
            <button onClick={handleToggleSelectAll}>
              {selectedContacts.length === filteredContacts.length
                ? "Unselect All"
                : "Select All"}
            </button>
          </div>
        )}

        {selectedContacts.length > 0 && (
          <button onClick={handleBulkDeleteClick}>Delete Contacts</button>
        )}
      </section>
      {modalVisible && pendingEditContact && (
        <ConfirmModal
          message={`Are you sure you want to edit ${pendingEditContact.firstName}?`}
          onConfirm={() => {
            setEditableContact(pendingEditContact);
            setPendingEditContact(null);
            setModalVisible(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onCancel={() => {
            setPendingEditContact(null);
            setModalVisible(false);
            setEditableContact(null);
          }}
        />
      )}

      {modalVisible && (contactToDelete || isBulkDelete) && (
        <ConfirmModal
          message={
            isBulkDelete
              ? `Are you sure you want to delete ${selectedContacts.length} selected contacts?`
              : `Are you sure you want to delete ${contactToDelete.firstName}?`
          }
          onConfirm={async () => {
            if (isBulkDelete) {
              await deleteBulkContacts(selectedContacts);
              setSelectedContacts([]);
              setIsBulkDelete(false);
            } else {
              await deleteContact(contactToDelete.id);
              setContactToDelete(null);
            }
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
            setContactToDelete(null);
            setIsBulkDelete(false);
          }}
        />
      )}
    </div>
  );
}

export default HomePage;
