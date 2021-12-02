import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "@src/routes";
import { messages, corsOptions, connectDB } from "@src/config";
import { errorMiddleware } from "@src/middlewares";

const app = express();

// Database
connectDB();

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// cross Origin Resource Sharing
app.use(cors(corsOptions));

// custom middleware logger
app.use(morgan("dev"));

// cookie - parser middlewares
app.use(cookieParser());

// routes
app.use("/api/auth", routes.authRouter);

// error-handler
app.use(errorMiddleware);

// server listenning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(messages.START_SERVER, PORT);
});
