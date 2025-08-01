import * as Yup from "yup";

export const clientRequestSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string()
    .min(5, "Minimum 5 charater")
    .max(1500, "Maximum charater is 1500")
    .required("Category is required"),
});
