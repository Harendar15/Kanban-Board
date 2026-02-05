import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(helmet());
app.use(morgan("combined"));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});


app.use(cookieParser());
app.use(
  cors({
    origin:"http://localhost:3000",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/auth", authRoutes);
app.use("/api", taskRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
