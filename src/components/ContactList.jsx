import { useContext } from "react";
import { ContactContext } from "../context/ContactContext"


function ContactList({ onRequestDelete, onEditContact }) {
  const { contacts, selectedContacts, setSelectedContacts } = useContext(ContactContext);

  const getAvatar = (contact) => {
    if (contact.avatarUrl) return contact.avatarUrl;
    if (contact.gender === "male")
      return "https://avatar.iran.liara.run/public/boy";
    if (contact.gender === "female")
      return "https://avatar.iran.liara.run/public/77";
    return `https://avatar.iran.liara.run/username?username=${contact.firstName}%20${contact.lastName}`;
  };
  const handleSelect = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(
        selectedContacts.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  return (
    <div>
      <h2>Contacts list</h2>
      {contacts.length === 0 ? (
        <p>No matching contact found.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <input
                type="checkbox"
                id="checkbox"
                checked={selectedContacts.includes(contact.id)}
                onChange={() => handleSelect(contact.id)}
              />
              <img
                src={getAvatar(contact)}
                alt={`${contact.firstName} avatar`}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <p className="contact-name">
                {contact.firstName} {contact.lastName}
              </p>{" "}
              <p className="contact-email">{contact.email}</p>
              <section className="contact-btn">
                <button onClick={() => onRequestDelete(contact)}>Delete</button>
                <button onClick={() => onEditContact(contact)}>Edit</button>
              </section>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;
