import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import roomRoutes from "./routes/rooms";
import { initSocketMatch } from "./controllers/socketIo";
import http from "http";
import { Server } from "socket.io";

/* CONFIGURATIONS */
require("dotenv").config('./.env');
const app = express();
app.use(express.json()); 
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); 
app.use(morgan("common")); 
app.use(cors());

const server = http.createServer(app);

export const io = new Server( server, {
  cors: {
    origin: "*"
  },
});

initSocketMatch();

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

/* ROUTES */
app.use("/rooms", roomRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8889;
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Question.insertMany(questions);
  })
  .catch((error) => console.log(`${error} did not connect`));

