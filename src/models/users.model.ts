import mongoose, { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}
interface IUserMethods {
  generateAuthToken(): Promise<string>;
}
export const userSchema = new Schema<IUser, {}, IUserMethods>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret";
  const token = jwt.sign({ id: user._id }, SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 10);
  next();
});

 const User = model("User", userSchema);

 export default User;