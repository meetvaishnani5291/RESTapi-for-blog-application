import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth.middlewares";
import validateReuest from "../middlewares/validation.middleware";
import { loginUserSchema } from "../validations/loginUserSchema";
import { registerUserSchema } from "../validations/registerUserSchema";

router.post("/login",validateReuest(loginUserSchema), userController.loginUser);

router.get("/", auth,userController.getUser);

router.post("/register",validateReuest(registerUserSchema),userController.addUser);

router.delete("/",auth, userController.deleteUser);

export default router;
