import { FieldErrors } from "react-hook-form";

export const formError = (errors: FieldErrors) => {
  return Object.values(errors).forEach((error) => {
    if (error?.message) alert(error.message);
  });
};
