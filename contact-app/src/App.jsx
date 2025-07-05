import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = (newContact) =>
    setContacts([...contacts, newContact]);

  return (
    <div>
      <h1>Contact Form</h1>
      <hr />
      <br />
      <ContactForm onAddContact={handleAddContact} />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
