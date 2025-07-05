
function ContactList({ contacts, onDeleteContact }) {
  return (
    <div>
      <h2>Contacts list</h2>
      {contacts.length === 0 ? (<p>No contacts yet.</p>) : (
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.firstName} {contact.lastName} - {contact.email}
            <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default ContactList;
