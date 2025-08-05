import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

export function useContactForm({
  schema,
  editableContact,
  onAdd,
  onUpdate,
  onResetEdit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (editableContact) {
      reset(editableContact);
    } else {
      reset();
    }
  }, [editableContact, reset]);

  const onSubmit = async (data) => {
    if (editableContact) {
      await onUpdate({ ...data, id: editableContact.id });
      if (onResetEdit) onResetEdit();
    } else {
      await onAdd(data);
    }

    reset({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
