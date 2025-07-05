
function ContactList({ contacts }) {
  return (
    <div>
      <h2>Contacts list</h2>
      {contacts.length === 0 ? (<p>No contacts yet.</p>) : (
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.firstName} {contact.lastName} - {contact.email}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default ContactList;
