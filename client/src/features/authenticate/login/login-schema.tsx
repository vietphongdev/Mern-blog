import * as Yup from "yup";

export const loginSchema = Yup.object({
  account: Yup.string().required("Enter your Email/Phone Number").email(),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(14, "Maximum 14 characters only"),
});
