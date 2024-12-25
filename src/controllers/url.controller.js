import { URLSCHEMA } from "../models/url.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import shortid from "short-id";

const shortIdCreater = asyncHandler(async (req, res) => {
    const { url } = req.body;

    if (!url) {
        throw new ApiError(400, "Url required");
    }

    const id = shortid.generate(8);
    const newShortUrl = await URLSCHEMA.create({
        shortId: id,
        redirectUrl: url,
        visitedHistory: [],
    });

    if (!newShortUrl) {
        throw new ApiError(400, "cannot generated short url please try again");
    }

    if (!id) {
        throw new ApiError(400, "not generated");
    }

    // return res
    //     .status(200)
    //     .json(
    //         new ApiResponce(200, { id: id }, "short url generated successfully")
    //     );
    return res.render("Home", {
        id: id,
    });
});

const redirectUrl = asyncHandler(async (req, res) => {
    const shortId = req.params.id;

    if (!shortId) {
        throw new ApiError(400, "url not valid");
    }

    const url = await URLSCHEMA.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitedHistory: {
                    timstamp: Date.now(),
                },
            },
        }
    );

    console.log(url.redirectUrl);
    res.redirect(`https://${url.redirectUrl}`);
});

const analyticsUrl = asyncHandler(async (req, res) => {
    const shortId = req.params.id;

    if (!shortId) {
        throw new ApiError(400, "short id required");
    }

    const url = await URLSCHEMA.findOne({ shortId });
    if (!url) {
        throw new ApiError(400, "invalid url");
    }
    return res.status(200).json(
        new ApiResponce(200, {
            clicks: url.visitedHistory.length,
            visitedHistory: url.visitedHistory,
        })
    );
});

const getAll = asyncHandler(async (req, res) => {
    const allurls = await URLSCHEMA.find();
    // return res
    //     .status(200)
    //     .json(new ApiResponce(200, allurls, "all urls fetched successfully"))
    //     .render()
    return res.render("Home", {
        urls: allurls,
    });
});

export { shortIdCreater, redirectUrl, analyticsUrl, getAll };
