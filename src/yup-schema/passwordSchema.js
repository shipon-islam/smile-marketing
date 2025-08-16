import * as Yup from "yup";
const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/svg"];
export const passwordSchema = Yup.object({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("password is required"),
  websiteLink: Yup.string()
    .url("Invalid URL")
    .required("Website link is required"),
  logo: Yup.mixed()
    .test("fileType", "Unsupported File Format", (value) => {
      if (!value || value.length === 0) return true;
      return SUPPORTED_FORMATS.includes(value[0].type);
    })
    .test("fileSize", "File too large", (value) => {
      if (!value || value.length === 0) return true;
      return value[0].size <= FILE_SIZE;
    }),
  isSelf: Yup.boolean().default(false),
});

export const passwordUpdateSchema = Yup.object({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("password is required"),
  websiteLink: Yup.string()
    .url("Invalid URL")
    .required("Website link is required"),
  logo: Yup.mixed().optional(),
  isSelf: Yup.boolean().default(false),
});
