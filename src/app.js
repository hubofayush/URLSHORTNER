import express from "express";

const app = express();

app.use(express.json());

import urlRouter from "./routes/url.routes.js";

app.use("/url", urlRouter);

export { app };
