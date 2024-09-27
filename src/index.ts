import dotenv from "dotenv";

dotenv.config();
import express, { NextFunction, json, Request, Response } from "express";
import routes from "./routes";
import { credentials } from "./constants";
import { connectToDatabase } from "./mongoClient";

const app = express();

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

app.get("/", (_, res: Response) => {
  res.send("Welcome to Auth microservice");
});

app.use(json());

app.use("/api/v1", routes);

const startServer = async () => {
  await connectToDatabase();
  app.listen(credentials.PORT || 8080, () => {
    console.log(`Server is running on port ${credentials.PORT || 8080}`);
  });
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
