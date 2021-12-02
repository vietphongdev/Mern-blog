import * as auth from "./auth";
import { googleLogin } from "./google-auth";
import { activeEmail } from "./email-auth";
import { activePhone } from "./phone-auth";

const authController = {
  ...auth,
  googleLogin,
  activeEmail,
  activePhone,
};

export default authController;
