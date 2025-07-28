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

  const addContact = async (newContact) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/contacts",
        newContact
      );
      setContacts((prev) => [...prev, response.data]);
      showSuccess("Contact added successfully!");
    } catch (error) {
      showError(["Failed to add contact"]);
      console.error(error);
    }
  };

  const updateContact = async (updatedContact) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/contacts/${updatedContact.id}`,
        updatedContact
      );
      setContacts((prev) =>
        prev.map((c) => (c.id === updatedContact.id ? response.data : c))
      );
      showSuccess("Contact updated successfully!");
    } catch (error) {
      showError(["Failed to update contact"]);
      console.error(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      showSuccess("Contact deleted successfully!");
    } catch (error) {
      showError(["Failed to delete contact"]);
      console.error(error);
    }
  };

  const deleteBulkContacts = async (ids) => {
  try {
    await Promise.all(ids.map((id) => axios.delete(`http://localhost:3001/contacts/${id}`)));
    setContacts((prev) => prev.filter((c) => !ids.includes(c.id)));
    showSuccess("Contacts deleted successfully!");
  } catch (error) {
    showError(["Failed to delete selected contacts"]);
    console.error(error);
  }
};


  useEffect(() => {
    axios
      .get("http://localhost:3001/contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        showError(["Failed to load contacts from server"]);
        console.error(error);
      });
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
