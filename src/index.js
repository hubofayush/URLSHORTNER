import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        app.listen(4000, () => {
            console.log("running on port 4000");
        });
    })
    .catch((error) => {
        console.log("mongodb connection error", error);
    });
