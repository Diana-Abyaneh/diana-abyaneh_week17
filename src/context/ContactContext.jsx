import { createContext, useState } from "react";

const ContactContext = createContext();

function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [editableContact, setEditableContact] = useState(null);

  return (
    <ContactContext.Provider
      value={{ contacts, setContacts, editableContact, setEditableContact }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export { ContactContext, ContactProvider };
