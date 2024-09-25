import express from "express";
import { credentials } from "./constants";

const app = express();

app.listen(credentials.PORT);
