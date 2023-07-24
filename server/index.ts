import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParse from "body-parser";
import cors from "cors";

import connectToDatabase from "./config/db_connect";
import todoRoutes from "./todo/Todo.routes";

dotenv.config();

const app: Express = express();
app.use(bodyParse.json());
app.use(cors());

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", todoRoutes);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
