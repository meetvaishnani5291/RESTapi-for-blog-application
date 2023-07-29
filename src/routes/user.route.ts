import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller";
import validateRequest from "../middlewares/validation.middleware";
import { loginUserSchema } from "../validations/loginUserSchema";
import { registerUserSchema } from "../validations/registerUserSchema";

router.post("/login",validateRequest(loginUserSchema), userController.loginUser);

router.get("/",userController.getUser);

router.post("/register",validateRequest(registerUserSchema),userController.addUser);

router.delete("/", userController.deleteUser);


export default router;
