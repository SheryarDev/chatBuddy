import express from "express";
import authRoutes from "./routes/Auth";
import conversationRoutes from './routes/Conversations'
import messagesRoutes from './routes/Messages'
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config({ path: "./.env" });
const DB: any = process.env.MONGO_URI
  // ||
  // "mongodb+srv://muhammadashraf:Betray123@cluster0.3cs8tso.mongodb.net/luckyMe";
// process.env.MONGO_URI as string
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to mongodb, test push");

    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    });

    app.use(
      "/app",
      express.static(path.join(__dirname, "..", "..", "client", "build"))
    );

    // serve client build through express

    app.use((req, res, next) => {
      res.setHeader("Cache-Control", "max-age=10");
      next();
    });

    app.get("/app/*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "..", "..", "client", "build", "index.html")
      );
    });



    app.use("/api/auth", authRoutes);
    app.use("/api/conversations",conversationRoutes)
    app.use("/api/messages",messagesRoutes)


    app.listen(8080, () => {
      console.log("Now listening to port 8080");
    });
  })
  .catch((error) => {
    console.log({ error });
    throw new Error(error);
  });
