import { signup, login } from "./auth";
import User from "@src/models/userModel";
import { OauthGooglePayload } from "@src/types";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { EMAIL_VERIFY_FAILED } from "@src/config/messages";

const { GOOGLE_SERVICE_CLIENT_ID } = process.env;

const client = new OAuth2Client(`${GOOGLE_SERVICE_CLIENT_ID}`);

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.body;

    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: `${GOOGLE_SERVICE_CLIENT_ID}`,
    });

    const payload = verify.getPayload() as OauthGooglePayload;
    const { email, email_verified, name, picture } = payload;

    if (!email_verified)
      return res.status(500).json({ message: EMAIL_VERIFY_FAILED });
    const user = await User.findOne({ account: email });
    if (user) {
      login({
        user,
        res,
      });
    } else {
      const user = {
        name,
        account: email,
        avatar: picture,
        type: "login",
      };
      signup(user, res);
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
