import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import ConfirmModal from "./ConfirmModal";

function App() {
  const [contacts, setContacts] = useState([]);

  const [editableContact, setEditableContact] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const [search, setSearch] = useState("");

  const handleAddContact = (newContact) => {
    const newContactWithId = { ...newContact, id: crypto.randomUUID() };
    setContacts([...contacts, newContactWithId]);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleEditContact = (contact) => {
    setEditableContact(contact);
  };

  const handleUpdateContact = (updatedContact) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setEditableContact(null);
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
    const fullText = `${contact.firstName} ${contact.lastName} ${contact.email}`.toLowerCase();
    return fullText.includes(search.toLowerCase());
  });
  
  const handleToggleSelectAll = () => {
    if(selectedContacts.length === filteredContacts.length)
      setSelectedContacts([]);
    else {
      const allVisibleIds = filteredContacts.map((contact) => contact.id);
      setSelectedContacts(allVisibleIds);
    }
  }

  return (
    <div>
      <h1>Contact Form</h1>
      <hr />
      <br />

      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ContactForm
        onAddContact={handleAddContact}
        editableContact={editableContact}
        onUpdateContact={handleUpdateContact}
      />

      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
        onEditContact={handleEditContact}
        onRequestDelete={handleDeleteClick}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
      />

      {filteredContacts.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
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

      {modalVisible && (contactToDelete || isBulkDelete) && (
        <ConfirmModal
          message={
            isBulkDelete
              ? `Are you sure you want to delete ${selectedContacts.length} selected contacts?`
              : `Are you sure you want to delete ${contactToDelete.firstName}?`
          }
          onConfirm={() => {
            if (isBulkDelete) {
              setContacts((prev) =>
                prev.filter((contact) => !selectedContacts.includes(contact.id))
              );
              setSelectedContacts([]);
              setIsBulkDelete(false);
            } else {
              handleDeleteContact(contactToDelete.id);
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

export default App;
