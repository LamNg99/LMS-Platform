import { Response } from "express";
import { UserProps } from "../models/user.model";
import { redis } from "./redis";

require("dotenv").config();

interface TokenOptionsProps {
  expire: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// parse environment variables to integrate with fallback value
const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);

const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

// options for cookies
export const accessTokenOptions: TokenOptionsProps = {
  expire: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOptions: TokenOptionsProps = {
  expire: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = (
  user: UserProps,
  statusCode: number,
  res: Response
) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  // upload sessions to redis
  redis.set(user._id, JSON.stringify(user) as any);

  // only set secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions: true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
