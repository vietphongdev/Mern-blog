import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
} from "@src/helpers";
import UserModel from "@src/models/userModel";
import {
  RefreshToken,
  OauthLogin,
  UserType,
  RequestWithUser,
} from "@src/types";
import { sendEmail } from "./email-auth";
import { sendOTP } from "./phone-auth";
import userModel from "@src/models/userModel";
import {
  messages,
  EXPIRE_REFRESH_TOKEN,
  EXPIRE_TIME_VERIFY_OTP,
  SALT_ROUNDS,
} from "@src/config";

const { CLIENT_URL, REFRESH_TOKEN_SECRET } = process.env;

export const signupAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, account, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(400).json({ message: firstError });
    }
    const user = await UserModel.findOne({ account });
    if (user) return res.status(400).json({ message: messages.ACCOUNT_EXISTS });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = { name, account, password: passwordHash };
    const activeToken = generateActiveToken({ user: newUser });
    const link = `${CLIENT_URL}/active/${activeToken}`;

    if (validateEmail(account)) {
      await sendEmail({
        to: account,
        title: messages.EMAIL_ACTIVE_TITLE,
        link,
        labelLink: messages.EMAIL_ACTIVE_LABEL_LINK,
      });
      res.json({
        message: messages.EMAIL_SENT_SUCCESS,
        user: {
          name,
          account,
        },
      });
    } else if (validatePhone(account)) {
      await sendOTP(account, "sms");
      res.json({
        message: messages.OTP_SENT_SUCCESS,
        user: {
          name,
          account,
          password: passwordHash,
        },
        expiredAt: Date.now() + EXPIRE_TIME_VERIFY_OTP,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const loginAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { account, password } = req.body;
    const user = await UserModel.findOne({ account });
    if (!user)
      return res.status(400).json({ message: messages.ACCOUNT_NOT_EXISTS });
    login({ user, password, res });
  } catch (error) {
    next(error);
  }
};

export const login = async ({
  user,
  password,
  res,
}: {
  user: UserType;
  password?: string;
  res: Response;
}) => {
  if (password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: messages.WRONG_ACCOUNT_OR_PASSWORD });
  }
  const payload = {
    user: {
      _id: user._id,
    },
  };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    path: `/api/auth/refresh-token`,
    maxAge: EXPIRE_REFRESH_TOKEN,
  });

  res.json({
    message: messages.LOGIN_SUCCESS,
    accessToken,
    user: {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      account: user.account,
      role: user.role,
    },
  });
};

export const signup = async (user: OauthLogin, res: Response) => {
  const newUser = new userModel(user);
  await newUser.save();
  const payload = {
    user: {
      _id: newUser._id,
    },
  };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    path: `/api/auth/refresh-token`,
    maxAge: EXPIRE_REFRESH_TOKEN,
  });

  res.json({
    message: messages.SIGNUP_SUCCESS,
    accessToken,
    user: {
      _id: newUser._id,
      name: newUser.name,
      avatar: newUser.avatar,
      account: newUser.account,
      role: newUser.role,
    },
  });
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token)
      return res.status(400).json({ message: messages.REFRESH_TOKEN_MISSING });

    const { user } = <RefreshToken>(
      jwt.verify(refresh_token, `${REFRESH_TOKEN_SECRET}`)
    );
    if (!user)
      return res.status(400).json({ message: messages.WRONG_REFRESH_TOKEN });

    const existentUser = await UserModel.findById(user._id);

    if (!existentUser)
      return res.status(400).json({ message: messages.ACCOUNT_NOT_EXISTS });

    const payload = {
      user: {
        _id: user._id,
      },
    };
    const accessToken = generateAccessToken(payload);

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("refresh_token", { path: `/api/auth/refresh-token` });
    return res.json({ message: messages.LOGOUT_SUCCESS });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { account } = req.body;
    const user = await UserModel.findOne({ account });
    if (!user)
      return res.status(400).json({ message: messages.ACCOUNT_NOT_EXISTS });

    if (validateEmail(account)) {
      const payload = {
        user: {
          _id: user._id,
        },
      };
      const accessToken = generateAccessToken(payload);
      const link = `${CLIENT_URL}/reset-password/${accessToken}`;

      await sendEmail({
        to: account,
        title: messages.EMAIL_FORGOT_PASSWORD_TITLE,
        link,
        labelLink: messages.EMAIL_FORGOT_PASSWORD_LABEL_LINK,
      });
      res.json({
        message: messages.EMAIL_SENT_SUCCESS,
      });
    } else if (validatePhone(account)) {
      await sendOTP(account, "sms");
      res.json({
        message: messages.OTP_SENT_SUCCESS,
        expiredAt: Date.now() + EXPIRE_TIME_VERIFY_OTP,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { password } = req.body;
    // const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // await UserModel.findOneAndUpdate(
    //   { _id: req.user._id },
    //   {
    //     password: passwordHash,
    //   }
    // );

    res.json({ message: messages.PASS_WORD_CHANGED_SUCCESS });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.find();

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
