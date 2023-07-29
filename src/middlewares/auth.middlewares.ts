import { JsonWebTokenError, verify } from "jsonwebtoken";
import User from "../models/users.model";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../interfaces/customRequest.interface";
import { NotFoundExpception, UnauthorizedException } from "../errors/customErrors";

type token = {
  id: string;
};

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if(req.isPublicRoute === true) return next();
    
    const token = req.header("authorization")!.replace("Bearer ", "");
    const decoded = verify(token, process.env.JWT_SECRET as string) as token;
    const user = await User.findOne(
      { _id: decoded.id },
      {
        password: 0,
        __v: 0,
      }
    );

    if (!user) throw new NotFoundExpception("User not found");
    req.user = user;
    next();
  } catch (err) {
    if(err instanceof JsonWebTokenError) {
      next(new UnauthorizedException(err.message))
    }else{
      next(err);
    }
  }
};

export default auth;
