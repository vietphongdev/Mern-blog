import authController from "@src/controllers/auth-controller";
import { validation } from "@src/middlewares";
import express from "express";

const router = express.Router();

router.post("/signup", validation.signup, authController.signupAccount);
router.post("/email-active", authController.activeEmail);
router.post("/phone-active", authController.activePhone);
router.post("/account-login", validation.login, authController.loginAccount);
router.post("/google-login", authController.googleLogin);
router.get("/refresh-token", authController.refreshToken);
router.get("/logout", authController.logout);
router.post(
  "/forgot-password",
  validation.forgotPassword,
  authController.forgotPassword
);
router.post("/reset-password", validation.resetPassword);
router.get("/getuser", authController.getUser);
export default router;
