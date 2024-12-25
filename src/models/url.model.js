import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
    {
        shortId: {
            type: String,
            unique: true,
            required: true,
        },
        redirectUrl: {
            type: String,
        },
        visitedHistory: [{ timstamp: { type: Number } }],
    },
    { timestamps: true }
);

export const URLSCHEMA = mongoose.model("URLSCHEMA", urlSchema);
