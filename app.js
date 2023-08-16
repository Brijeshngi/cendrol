import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
config({
  path: "./config/config.env",
});
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

export default app;
