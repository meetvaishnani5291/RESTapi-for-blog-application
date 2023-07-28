import express, {
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import morgan from "morgan";

import userRoutes from "../routes/user.route";

const app = express();
app.use(morgan("dev"));

app.use(json());
app.use(urlencoded({ extended: false }));

//routes
app.use("/users", userRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

export default app;
