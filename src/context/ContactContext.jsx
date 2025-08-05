import { createContext, useState, useEffect } from "react";
import { useNotifications } from "../utils/useNotifications.js";

const ContactContext = createContext();

function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [editableContact, setEditableContact] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

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

  const { successMessage, errorMessages, showSuccess, showError } =
    useNotifications();

  useEffect(() => {
    const filtered = contacts.filter((contact) => {
      const fullText =
        `${contact.firstName} ${contact.lastName} ${contact.email}`.toLowerCase();
      return fullText.includes(search.toLowerCase());
    });
    setFilteredContacts(filtered);
  }, [contacts, search]);

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
        filteredContacts,
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
