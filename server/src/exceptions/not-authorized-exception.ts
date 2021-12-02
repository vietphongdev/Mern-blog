import { NOT_AUTHORIZED } from "@src/config/messages";
import HttpException from "./http-exception";

class NotAuthorizedException extends HttpException {
  constructor() {
    super(403, NOT_AUTHORIZED);
  }
}

export default NotAuthorizedException;
