import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";

import {
  AuthenticationTokenMissingException,
  WrongAuthenticationTokenException,
} from "@src/exceptions";
import { DataStoredInToken, RequestWithUser } from "@src/types";
import userModel from "@src/models/userModel";

const secret = process.env.JWT_SECRET;

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user._id = user._id;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
