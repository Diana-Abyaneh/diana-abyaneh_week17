import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  const [editableContact, setEditableContact] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

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

  const handleDeleteClick = contact => {
    setContactToDelete(contact);
    setModalVisible(true);
  }

  return (
    <div>
      <h1>Contact Form</h1>
      <hr />
      <br />
      <ContactForm
        onAddContact={handleAddContact}
        editableContact={editableContact}
        onUpdateContact={handleUpdateContact}
      />
      <ContactList
        contacts={contacts}
        onDeleteContact={handleDeleteContact}
        onEditContact={handleEditContact}
        onRequestDelete={handleDeleteClick}
      />
      {modalVisible && (
        <ConfirmModal
          message={`Are you sure you want to delete ${contactToDelete.firstName}?`}
          onConfirm={() => {
            handleDeleteContact(contactToDelete.id);
            setModalVisible(false);
          }}
          onCancel={() => setModalVisible(false)}
        />
)}

    </div>
  );
}

export default App;
