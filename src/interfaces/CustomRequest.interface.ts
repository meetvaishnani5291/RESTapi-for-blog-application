import { IUser } from "../models/users.model";
import { Request } from "express";
import { ParsedQueryOptions } from "./queryOptions.interface";

export interface CustomRequest extends Request {
  user?: IUser;
  blogQueryOptions?: ParsedQueryOptions
  isPublicRoute?: boolean;
}
