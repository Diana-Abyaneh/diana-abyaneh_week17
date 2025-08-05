import { useEffect } from "react";
import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import Select from "./Select";
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
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
