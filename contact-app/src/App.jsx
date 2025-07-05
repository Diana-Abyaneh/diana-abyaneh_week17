import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  const [editableContact, setEditableContact] = useState(null);

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
      />
    </div>
  );
}

export default App;
