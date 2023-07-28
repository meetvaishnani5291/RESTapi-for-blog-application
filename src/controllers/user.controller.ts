import User from "../models/users.model";
import { compare } from "bcryptjs";
import { CustomRequest } from "../interfaces/CustomRequest.interface";
import { NextFunction, Response } from "express";

const loginUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = await user.generateAuthToken();
    res.status(200).json({ token });
  } catch (err) {
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
    if (userExist)
      return res
        .status(400)
        .json({ message: "user with this email already exist" });

    const user = await User.create(newUser);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: CustomRequest, res: Response) => {
  res.status(200).json(req.user);
};

const deleteUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!._id;
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
