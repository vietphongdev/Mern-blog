import UserModel from "@src/models/userModel";
import { createUser, loginUser } from "@src/helpers/auth";
import { Request, Response } from "express";
import fetch from "node-fetch";

export const facebookLogin = async (req: Request, res: Response) => {
  try {
    const { accessToken, userID } = req.body;

    const URL = `
          https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}
        `;

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    const { email, name, picture } = data;

    const user = await UserModel.findOne({ account: email });

    if (user) {
      loginUser({ user, res });
    } else {
      const user = {
        name,
        account: email,
        avatar: picture.data.url,
        type: "login",
      };
      createUser(user, res);
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
