import { check } from "express-validator";
import { validatePassword, validateEmailOrPhone } from "@src/helpers";

export const signup = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({
      min: 4,
      max: 18,
    })
    .withMessage("name must be between 4 to 18 characters")
    .custom((val) => /^[A-Za-z0-9]+$/g.test(val))
    .withMessage("Name not use uniq characters"),

  check("account")
    .notEmpty()
    .withMessage("Must be a valid email address")
    .custom((val) => {
      return validateEmailOrPhone(val);
    })
    .withMessage("Please enter email or phone valid"),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .custom((val) => {
      return validatePassword(val);
    })
    .withMessage(
      "Please enter a password Minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
    ),
];

export const login = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];

export const forgotPassword = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];

export const resetPassword = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];
