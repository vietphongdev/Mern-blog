import { Request } from "express";
import { Document } from "mongoose";

export type UserType = {
  name: string;
  account: string;
  password: string;
  avatar: string;
  type: string;
  role: number;
  _doc: object;
} & Document;

export type OauthLogin = {
  name: string;
  account: string;
  avatar?: string;
  type: string;
};

export type AccountSignup = OauthLogin & {
  password: string;
};

export type ActiveToken = {
  user: AccountSignup;
  iat: number;
  exp: number;
};

export type OauthGooglePayload = {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
};

export type AccessToken = {
  user: {
    _id: string;
  };
};

export type RefreshToken = AccessToken;

export type RequestWithUser = AccessToken & Request;
