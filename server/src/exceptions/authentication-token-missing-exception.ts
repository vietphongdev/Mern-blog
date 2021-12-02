import { ACCESS_TOKEN_MISSING } from "@src/config/messages";
import HttpException from "./http-exception";

class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(401, ACCESS_TOKEN_MISSING);
  }
}

export default AuthenticationTokenMissingException;
