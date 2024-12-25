import express from "express";
import path from "path";
const app = express();
import urlRouter from "./routes/url.routes.js";

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.use("/url", urlRouter);

export { app };
