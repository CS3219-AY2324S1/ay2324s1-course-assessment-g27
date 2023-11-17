import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import questionRoutes from "./routes/questions";

/* CONFIGURATIONS */
require("dotenv").config('./.env');
const app = express();
app.use(express.json()); 
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); 
app.use(morgan("common")); 
app.use(bodyParser.json({ limit: "30mb", inflate: true})); 
app.use(bodyParser.urlencoded({ limit:"30mb", inflate: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); 

/* ROUTES */
app.get('/', (req, res) => {
  res.send('Hello from question-service!');
});
app.use("/questions", questionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

