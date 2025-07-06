import { useState, useEffect } from "react";

function ContactForm({ onAddContact, editableContact, onUpdateContact }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (editableContact) {
      setFormData({
        firstName: editableContact.firstName,
        lastName: editableContact.lastName,
        email: editableContact.email,
      });
    }
  }, [editableContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required!";
    if (!formData.lastName) newErrors.lastName = "Last name is required!";
    if (!formData.email) newErrors.email = "Email is required!";

    {setTimeout(() => {
          setErrors("")
        }, 3000);}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Email format is invalid!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (editableContact) {
      onUpdateContact({ ...formData, id: editableContact.id });
    } else {
      onAddContact(formData);
    }

    setFormData({ firstName: "", lastName: "", email: "" });
  };

  const [errors, setErrors] = useState({});

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
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        <button type="submit" onClick={handleSubmit}>
          {editableContact ? "Update Contact" : "Add Contact"}
        </button>
      </div>
      <section className="errors">
        {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        
      </section>
      
    </form>
  );
}

export default ContactForm;
