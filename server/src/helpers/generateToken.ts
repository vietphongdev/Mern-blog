import jwt from "jsonwebtoken";

const { ACTIVE_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;

export const generateActiveToken = (payload: object) => {
  return jwt.sign(payload, `${ACTIVE_TOKEN_SECRET}`, {
    expiresIn: "7m",
  });
};

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${ACCESS_TOKEN_SECRET}`, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, `${REFRESH_TOKEN_SECRET}`, {
    expiresIn: "30d",
  });
};
