import User from "../models/users.model";
import { compare } from "bcryptjs";
import { CustomRequest } from "../interfaces/customRequest.interface";
import { NextFunction, Response } from "express";
import { LoginUser } from "../types/users.type";
import { BadRequestException, UnauthorizedException } from "../errors/customErrors";

const loginUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email, password} = req.body as LoginUser;

    const user = await User.findOne({ email });
    if (!user) throw new UnauthorizedException("Invalid credentials");
  
    const isMatch = await compare(password, user.password);
    if (!isMatch)  throw new UnauthorizedException("Invalid credentials");

    const token = await user.generateAuthToken();
    res.status(200).json({access_token: token });

  } catch (err) {
    console.log(err);
    console.log("---------login-controller---------------");
    next(err);
  }
};

const addUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body;

    const userExist = await User.findOne({ email: newUser.email });
    if (userExist) throw new BadRequestException( "user with this email already exist" );

    const user = await User.create(newUser);
    res.status(200).json(user);

  } catch (err) {
    next(err);
  }
};

const getUser = async (req: CustomRequest, res: Response,next : NextFunction) => {
  try{
    res.status(200).json(req.user);
  }catch(err){
    next(err);
  }
};

const deleteUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId :string = req.user!._id;
    await User.deleteOne({ _id: userId });
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export default {
  addUser,
  getUser,
  deleteUser,
  loginUser,
};
