import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
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

app.get('/', (req, res) => {
  res.send('Hello from matching-service!');
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8001;
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => console.log(`matching-service db listening on ${PORT}`));
  })
  .catch((error) => console.log(`${error} matching-service db did not connect`));

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
