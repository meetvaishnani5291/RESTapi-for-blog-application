import express, {
  json,
  urlencoded,
} from "express";
import morgan from "morgan";

import userRoutes from "../routes/user.route";
import blogRoutes from "../routes/blog.route";
import auth from "../middlewares/auth.middlewares";
import publicRoutesMiddleware from "../middlewares/publicRoute.middleware";
import errorHandler from "../middlewares/errorHandler.middleware";


const app = express();

//
app.use(morgan("dev"));

// body-parsers
app.use(json());
app.use(urlencoded({ extended: false }));

//auth
app.use(publicRoutesMiddleware);
app.use(auth);
//routes
app.use("/users", userRoutes);

app.use("/blogs",blogRoutes)

//common error handlers
app.use(errorHandler);

export default app;
