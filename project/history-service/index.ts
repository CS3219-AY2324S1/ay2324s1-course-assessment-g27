import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/users";
import { seedDb } from "./db";

/* CONFIGURATIONS */
require("dotenv").config('./.env');
const app = express();
app.use(express.json()); 
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); 
app.use(morgan("common")); 
app.use(cors());

/* ROUTES */
app.get('/', (req, res) => {
  res.send('Hello from history-service!');
});
app.use("/users", userRoutes);

/* DATABASE SETUP */
app.listen(process.env.PORT, async () => {
  try {
      await seedDb()
  } catch {
      console.info("history-service db seeded in the past");
  }
  console.info("history-service listening on port 8500");
});

