import { WRONG_ACCESS_TOKEN } from "@src/config/messages";
import HttpException from "./http-exception";

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, WRONG_ACCESS_TOKEN);
  }
}

export default WrongAuthenticationTokenException;
