import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import styles from "./ContactForm.module.css";
import FormField from "../common/FormField";
import { contactFormFields } from "./ContactFormFields";
import { contactFormSchema } from "./contactFormSchema";
import { useContactForm } from "../../utils/useContactForm";

function ContactForm() {
  const { editableContact, addContact, updateContact, setEditableContact } =
    useContext(ContactContext);

  const { register, handleSubmit, onSubmit, errors } = useContactForm({
    schema: contactFormSchema,
    editableContact,
    onAdd: addContact,
    onUpdate: updateContact,
    onResetEdit: () => setEditableContact(null),
  });

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
