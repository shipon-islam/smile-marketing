import * as Yup from "yup";

export const inventorySchema = Yup.object({
  name: Yup.string().required("Name is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Location is required"),
  status: Yup.string()
    .oneOf(["checked out", "checked in"])
    .required("Status is required"),
  stock: Yup.string()
    .min(0, "Stock can't be negative")
    .required("Stock is required"),
  sellingType: Yup.string()
    .oneOf(["rent", "sell"])
    .required("Selling type is required"),
  price: Yup.string()
    .min(0, "Price must be positive")
    .required("Price is required"),
  contactLink: Yup.string()
    .url("Invalid URL")
    .required("Contact link is required"),
  isVisibleToClients: Yup.boolean().required("Visibility is required"),
  // tags: Yup.array().of(Yup.string()).required("Tags is required"),
  // image: Yup.string().required("Image is required"),
});
