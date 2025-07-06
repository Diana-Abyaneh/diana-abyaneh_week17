function ContactList({
  contacts,
  onRequestDelete,
  onEditContact,
  selectedContacts,
  setSelectedContacts,
}) {
  
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
                checked={selectedContacts.includes(contact.id)}
                onChange={() => handleSelect(contact.id)}
              />
              <p>{contact.firstName} {contact.lastName}</p> {contact.email}
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
