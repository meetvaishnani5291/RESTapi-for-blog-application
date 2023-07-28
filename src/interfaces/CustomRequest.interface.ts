import { IUser } from "../models/users.model";
import { Request } from "express";

export interface CustomRequest extends Request {
  user?: IUser;
}
