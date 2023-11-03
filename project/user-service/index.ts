import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import http from "http";
import { seedDb } from "./db";

/* CONFIGURATIONS */
require("dotenv").config('./.env');
const app = express();
app.use(express.json()); 
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); 
app.use(morgan("common")); 
app.use(cors());

const server = http.createServer(app);
server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/* DATABASE SETUP */
// TODO: How to check if DB has been seeded in the past
app.listen(process.env.PORT, async () => {
  try {
      await seedDb();
  } catch {
      // logger.info("Seeded in the past");
  }
  // logger.info("user-service listening on port 8000");
});

