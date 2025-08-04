import { useEffect } from "react";
import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./form/Input";
import Select from "./form/Select";
import styles from "./ContactForm.module.css";

function ContactForm() {
  const contactSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    gender: yup.string().notRequired(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const {
    editableContact,
    setEditableContact,
    showError,
    addContact,
    updateContact,
  } = useContext(ContactContext);

  useEffect(() => {
    if (editableContact) {
      setValue("firstName", editableContact.firstName || "");
      setValue("lastName", editableContact.lastName || "");
      setValue("email", editableContact.email || "");
      setValue("gender", editableContact.gender || "");
    }
  }, [editableContact, setValue]);

  const onSubmit = async (data) => {
    if (editableContact) {
      await updateContact({ ...data, id: editableContact.id });
      setEditableContact(null);
    } else {
      await addContact(data);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formInputs}>
        <div>
          <Input
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
          />
        </div>

        <div>
          <Input
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
          />
        </div>
        <div>
          <Input
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
        </div>
        <div>
          <Select
            label="Gender"
            name="gender"
            register={register}
            error={errors.gender}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
        </div>

        <button type="submit">
          {editableContact ? "Update Contact" : "Add Contact"}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
