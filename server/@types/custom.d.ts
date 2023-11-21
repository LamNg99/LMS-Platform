import { Request } from "express";
import { UserProps } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserProps;
    }
  }
}
