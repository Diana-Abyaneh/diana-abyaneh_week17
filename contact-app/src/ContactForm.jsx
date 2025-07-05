import { useState } from "react";

function ContactForm({ onAddContact }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required!";
    if (!formData.lastName) newErrors.lastName = "Last name is required!";
    if (!formData.email) newErrors.email = "Email is required!";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Email format is invalid!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    console.log(formData);
    onAddContact(formData);
    setFormData({ firstName: "", lastName: "", email: "" });
  };

  const [errors, setErrors] = useState({});

  return (
    <form action="">
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
      {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
      <label htmlFor="lastName">Last name: </label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}

      <label htmlFor="email">Email: </label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
