import { useState, useEffect } from "react";

function ContactForm({
  onAddContact,
  editableContact,
  onUpdateContact,
  showError,
}) {
  const [formData, setFormData] = useState({
    avatarUrl: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    if (editableContact) {
      setFormData({
        firstName: editableContact.firstName || "",
        lastName: editableContact.lastName || "",
        email: editableContact.email || "",
        gender: editableContact.gender || "",
        avatarUrl: editableContact.avatarUrl || "",
      });
    }
  }, [editableContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = [];

    if (!formData.firstName) newErrors.push("First name is required!");
    if (!formData.lastName) newErrors.push("Last name is required!");
    if (!formData.email) newErrors.push("Email is required!");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.push("Email format is invalid!");
    }

    if (newErrors.length > 0) {
      showError(newErrors);
      return;
    }

    if (editableContact) {
      onUpdateContact({ ...formData, id: editableContact.id });
    } else {
      onAddContact(formData);
    }

    setFormData({ firstName: "", lastName: "", email: "" });
  };

  return (
    <form action="">
      <div className="form-inputs">
        <label htmlFor="firstName">First name: </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />

        <label htmlFor="lastName">Last name: </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button type="submit" onClick={handleSubmit}>
          {editableContact ? "Update Contact" : "Add Contact"}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
