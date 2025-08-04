import { useState, useEffect } from "react";
import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import ConfirmModal from "./ConfirmModal";
import styles from "./HomePage.module.css"


function HomePage() {
  const {
    contacts,
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
  } = useContext(ContactContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const [pendingEditContact, setPendingEditContact] = useState(null);

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

  const filteredContacts = contacts.filter((contact) => {
    const fullText =
      `${contact.firstName} ${contact.lastName} ${contact.email}`.toLowerCase();
    return fullText.includes(search.toLowerCase());
  });

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
      <section className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search contacts..."
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      <hr />
      <br />

      {successMessage && (
        <div
          className={styles.successMessage}
        >
          {successMessage}
        </div>
      )}

      {errorMessages.length > 0 &&
        errorMessages.map((message, index) => (
          <div
            key={index}
            className={styles.errorMessage}
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
      <section className="bulk-btn">
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
