import { useEffect } from "react";
import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./ContactForm.module.css";
import FormField from "../common/FormField";
import { contactFormFields } from "./ContactFormFields";
import { contactFormSchema } from "./contactFormSchema";

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
    },
  });

  const { editableContact, setEditableContact, addContact, updateContact } =
    useContext(ContactContext);

  useEffect(() => {
    if (editableContact) {
      reset({
        firstName: editableContact.firstName || "",
        lastName: editableContact.lastName || "",
        email: editableContact.email || "",
        gender: editableContact.gender || "",
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
      });
    }
  }, [editableContact, reset]);

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
          {contactFormFields.map((field) => (
            <FormField
              key={field.name}
              {...field}
              register={register}
              error={errors[field.name]}
            />
          ))}
        <button type="submit">
          {editableContact ? "Update Contact" : "Add Contact"}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
