import { createContext, useState, useEffect } from "react";
import axios from "axios";

const ContactContext = createContext();

function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [editableContact, setEditableContact] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showError = (messages) => {
    setErrorMessages(messages);
    setTimeout(() => setErrorMessages([]), 3000);
  };

  const addContact = (newContact) => {
    const updatedContacts = [
      ...contacts,
      { ...newContact, id: crypto.randomUUID() },
    ];
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    showSuccess("Contact added successfully!");
  };

  const updateContact = (updatedContact) => {
  const updatedContacts = contacts.map((c) =>
    c.id === updatedContact.id ? updatedContact : c
  );
  setContacts(updatedContacts);
  localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  showSuccess("Contact updated successfully!");
};

const deleteContact = (id) => {
  const updatedContacts = contacts.filter((c) => c.id !== id);
  setContacts(updatedContacts);
  localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  showSuccess("Contact deleted successfully!");
};

const deleteBulkContacts = (ids) => {
  const updatedContacts = contacts.filter((c) => !ids.includes(c.id));
  setContacts(updatedContacts);
  localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  showSuccess("Contacts deleted successfully!");
};



  useEffect(() => {
    const stored = localStorage.getItem("contacts");
    if (stored) {
      setContacts(JSON.parse(stored));
    }
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        setContacts,
        editableContact,
        setEditableContact,
        successMessage,
        errorMessages,
        showSuccess,
        showError,
        search,
        setSearch,
        selectedContacts,
        setSelectedContacts,
        addContact,
        updateContact,
        deleteContact,
        deleteBulkContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export { ContactContext, ContactProvider };
