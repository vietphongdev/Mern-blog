import {
  ACCOUNT_ACTIVATED_SUCCESS,
  WRONG_ACCESS_TOKEN,
  OTP_CODE_EXPIRED,
} from "@src/config/messages";
import UserModel from "@src/models/userModel";
import { Request, Response } from "express";
import { Twilio } from "twilio";

const {
  TWILIO_ACCOUNT_SID = "",
  TWILIO_AUTH_TOKEN = "",
  TWILIO_SERVICE_ID = "",
} = process.env;

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendOTP = async (to: string, channel: string) => {
  try {
    const data = await client.verify
      .services(TWILIO_SERVICE_ID)
      .verifications.create({
        to,
        channel,
      });

    return data;
  } catch (err) {
    console.log(err);
  }
};

const smsVerify = async (to: string, code: string) => {
  try {
    const data = await client.verify
      .services(TWILIO_SERVICE_ID)
      .verificationChecks.create({
        to,
        code,
      });

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const activePhone = async (req: Request, res: Response) => {
  try {
    const { user, code, expiredAt } = req.body;
    if (Date.now() > expiredAt) {
      return res.status(401).json({ message: OTP_CODE_EXPIRED });
    }

    const data = await smsVerify(user.account, code);
    if (!data?.valid)
      return res.status(401).json({ message: WRONG_ACCESS_TOKEN });
    await new UserModel(user).save();
    res.json({ message: ACCOUNT_ACTIVATED_SUCCESS });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
