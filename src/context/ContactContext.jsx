import { createContext, useState, useEffect } from "react";

const ContactContext = createContext();

function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [editableContact, setEditableContact] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const API_URL = "http://localhost:3001/contacts";

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showError = (messages) => {
    setErrorMessages(messages);
    setTimeout(() => setErrorMessages([]), 3000);
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      showError(["Failed to fetch contacts"]);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (newContact) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });
      if (!res.ok) throw new Error("Failed to add contact");
      const added = await res.json();
      setContacts([...contacts, added]);
      showSuccess("Contact added successfully!");
    } catch (error) {
      showError([error.message]);
    }
  };

  const updateContact = async (updatedContact) => {
    try {
      const res = await fetch(`${API_URL}/${updatedContact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });
      if (!res.ok) throw new Error("Failed to update contact");
      const updated = await res.json();
      setContacts(
        contacts.map((c) => (c.id === updated.id ? updated : c))
      );
      showSuccess("Contact updated successfully!");
    } catch (error) {
      showError([error.message]);
    }
  };

  const deleteContact = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete contact");
      setContacts(contacts.filter((c) => c.id !== id));
      showSuccess("Contact deleted successfully!");
    } catch (error) {
      showError([error.message]);
    }
  };

  const deleteBulkContacts = async (ids) => {
    try {
      await Promise.all(
        ids.map((id) =>
          fetch(`${API_URL}/${id}`, {
            method: "DELETE",
          })
        )
      );
      setContacts(contacts.filter((c) => !ids.includes(c.id)));
      showSuccess("Contacts deleted successfully!");
    } catch (error) {
      showError(["Failed to delete some contacts"]);
    }
  };

  useEffect(() => {
    const filtered = contacts.filter((contact) => {
      const fullText = `${contact.firstName} ${contact.lastName} ${contact.email}`.toLowerCase();
      return fullText.includes(search.toLowerCase());
    });
    setFilteredContacts(filtered);
  }, [contacts, search]);

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
