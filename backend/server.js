import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import tweetRoutes from "./routes/tweetRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.json({ message: "API is running..." });
});

app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
