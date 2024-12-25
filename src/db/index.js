import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";
const connectDB = async () => {
    // console.log(process.env.MONGOURL);
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGOURL}${DB_NAME}`
        );
        console.log(
            `\nMongoDB connected to DB HOST:${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("Mongodb conncection Error: ", error);
        process.exit(1);
    }
};

export default connectDB;
