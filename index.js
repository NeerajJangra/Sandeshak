import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import emailRouter from "./routes/emailRoutes.js";

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

app.use(express.json());
app.use("/api", emailRouter);
app.get("/api/health", (req, res) => {
  res.json({ message: "server is running healthy" });
});

app.listen(PORT, () => console.log("Server is Running on PORT:", PORT));
