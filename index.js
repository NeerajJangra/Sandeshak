import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(`Error while connecting DB ${error}`);
  });

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Server is Running on PORT:", PORT));
