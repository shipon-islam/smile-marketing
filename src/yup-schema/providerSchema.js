import * as Yup from "yup";

export const providerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  company: Yup.string().required("Company is required"),
  specialty: Yup.string().required("Specialty is required"),
  phone: Yup.string().required("Phone is required"),
  tags: Yup.string()
    .required("At least 1 tag is required")
    .test("max-tags", "You can enter up to 5 tags only", (value) => {
      if (!value) return false;
      const tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      return tags.length > 0 && tags.length <= 5;
    }),
});
