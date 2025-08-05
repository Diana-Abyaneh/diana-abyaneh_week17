import { createContext, useState, useEffect } from "react";
import { useNotifications } from "../utils/useNotifications.js";
import axios from "axios";

const ContactContext = createContext();

function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [editableContact, setEditableContact] = useState(null);
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
      const response = await axios.get(API_URL);
      setContacts(response.data);
    } catch (error) {
      showError(["Failed to fetch contacts"]);
    }
  };

  const addContact = async (newContact) => {
    try {
      const response = await axios.post(API_URL, newContact);
      setContacts([...contacts, response.data]);
      showSuccess("Contact added successfully!");
    } catch (error) {
      showError(["Failed to add contact"]);
    }
  };

  const updateContact = async (updatedContact) => {
    try {
      await axios.put(`${API_URL}/${updatedContact.id}`, updatedContact);
      setContacts(
        contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
      );
      showSuccess("Contact updated successfully!");
    } catch (error) {
      showError(["Failed to update contact"]);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts(contacts.filter((c) => c.id !== id));
      showSuccess("Contact deleted successfully!");
    } catch (error) {
      showError(["Failed to delete contact"]);
    }
  };

  const deleteBulkContacts = async (ids) => {
    try {
      await Promise.all(ids.map((id) => axios.delete(`${API_URL}/${id}`)));
      setContacts(contacts.filter((c) => !ids.includes(c.id)));
      showSuccess("Contacts deleted successfully!");
    } catch (error) {
      showError(["Failed to delete contacts"]);
    }
  };

  useEffect(() => {
    const filtered = contacts.filter((contact) => {
      const fullText = `${contact.firstName} ${contact.lastName} ${contact.email}`.toLowerCase();
      return fullText.includes(search.toLowerCase());
    });
    setFilteredContacts(filtered);
  }, [contacts, search]);

  useEffect(() => {
    fetchContacts();
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
