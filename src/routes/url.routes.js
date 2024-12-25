import express from "express";
import {
    analyticsUrl,
    getAll,
    redirectUrl,
    shortIdCreater,
} from "../controllers/url.controller.js";

const router = express.Router();
router.route("/").get(getAll);
router.route("/generate").post(shortIdCreater);
router.route("/get/:id").get(redirectUrl);
router.route("/analytics/:id").get(analyticsUrl);

export default router;
