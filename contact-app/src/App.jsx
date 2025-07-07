import { useState , useEffect} from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import ConfirmModal from "./ConfirmModal";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  const [editableContact, setEditableContact] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const [search, setSearch] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [pendingEditContact, setPendingEditContact] = useState(null);

  const [errorMessages, setErrorMessages] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const handleAddContact = (newContact) => {
    const newContactWithId = { ...newContact, id: crypto.randomUUID() };
    setContacts(prev => [...prev, newContactWithId]);
  };

  const handleDeleteContact = (id) => {
    setContacts(prev => prev.filter((contact) => contact.id !== id));
  };

  const handleEditContact = (contact) => {
    setPendingEditContact(contact);
    setModalVisible(true);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };


  const handleUpdateContact = (updatedContact) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setEditableContact(null);
    showSuccess("Contact updated successfully!");
  }
  
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

  const showError = (messages) => {
    setErrorMessages(messages);
      setTimeout(() => {
        setErrorMessages([]);
      }, 3000);
  };

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts, isLoaded]);

  return (
    <div className="container">
      <h1 className="heading">Contact App</h1>
      <section className="search-container">
        <input
          type="text"
          placeholder="Search contacts..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      <hr />
      <br />

      <br />
      <br />

      
      {successMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#4caf50",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 1001,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {successMessage}
        </div>
      )}

      {errorMessages.length > 0 &&
        errorMessages.map((message, index) => (
          <div
            key={index}
            style={{
              position: "fixed",
              top: `${20 + index * 60}px`,
              right: "20px",
              backgroundColor: "#f44336",
              color: "white",
              padding: "12px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              zIndex: 1001,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            {message}
          </div>
        ))}

      <ContactForm
        onAddContact={handleAddContact}
        editableContact={editableContact}
        onUpdateContact={handleUpdateContact}
        showError={showError}
      />

      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
        onEditContact={handleEditContact}
        onRequestDelete={handleDeleteClick}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
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
          onConfirm={() => {
            if (isBulkDelete) {
              setContacts((prev) =>
                prev.filter((contact) => !selectedContacts.includes(contact.id))
              );
              setSelectedContacts([]);
              setIsBulkDelete(false);
              showSuccess("Contacts deleted successfully!");

            } else {
              handleDeleteContact(contactToDelete.id);
              setContactToDelete(null);
              showSuccess("Contact deleted successfully!");
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
