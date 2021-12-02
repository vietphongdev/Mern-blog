const nodemailer = require("nodemailer");
import UserModel from "@src/models/userModel";
import { ActiveToken } from "@src/types";
import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import {
  ACCOUNT_ACTIVATED_SUCCESS,
  EMAIL_ACTIVATED_ALREADY,
  WRONG_ACCESS_TOKEN,
} from "@src/config/messages";
import { mailTemplate } from "@src/helpers";

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const {
  GOOGLE_SERVICE_CLIENT_ID,
  GOOGLE_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  MAILING_SENDER_ADDRESS,
  ACTIVE_TOKEN_SECRET,
} = process.env;

export const sendEmail = async ({
  to,
  title,
  link,
  labelLink,
}: {
  to: string;
  title: string;
  link: string;
  labelLink: string;
}) => {
  const oAuth2Client = new OAuth2Client(
    GOOGLE_SERVICE_CLIENT_ID,
    GOOGLE_SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oAuth2Client.setCredentials({ refresh_token: MAILING_SERVICE_REFRESH_TOKEN });

  const accessToken = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MAILING_SENDER_ADDRESS,
      clientId: GOOGLE_SERVICE_CLIENT_ID,
      clientSecret: GOOGLE_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: MAILING_SENDER_ADDRESS,
    to,
    subject: "BlogDev",
    html: mailTemplate({
      title,
      link,
      labelLink,
    }),
  };

  const result = await transport.sendMail(mailOptions);
  return result;
};

export const activeEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { active_token } = req.body;
    const { user } = <ActiveToken>(
      jwt.verify(active_token, `${ACTIVE_TOKEN_SECRET}`)
    );
    if (!user) return res.status(400).json({ message: WRONG_ACCESS_TOKEN });

    const existentUser = await UserModel.findOne({ account: user.account });

    if (existentUser) {
      return res.status(400).json({ message: EMAIL_ACTIVATED_ALREADY });
    }
    await new UserModel(user).save();
    res.json({ message: ACCOUNT_ACTIVATED_SUCCESS });
  } catch (error) {
    next(error);
  }
};
