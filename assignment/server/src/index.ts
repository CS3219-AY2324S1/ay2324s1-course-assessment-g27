import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
// import { fileURLToPath } from "url";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import questionRoutes from "./routes/questions";

import http from "http";
import { Server } from "socket.io";

require("dotenv").config('./.env');
const app = express();
app.use(express.json()); 
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); 
app.use(morgan("common")); 
app.use(bodyParser.json({ limit: "30mb", inflate: true})); 
app.use(bodyParser.urlencoded({ limit:"30mb", inflate: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); // TODO: Change from local to cloud storage for images

const server = http.createServer(app);

export const io = new Server( server, {
  cors: {
    origin: "*"
  },
});


/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // TODO: Whenever someones uploads a file to our website, it will be saved to local storage. Change to cloud.
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/questions", questionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} did not connect`));


