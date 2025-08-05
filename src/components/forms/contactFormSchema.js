import * as yup from "yup";

export const contactFormSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  gender: yup.string().notRequired(),
});
