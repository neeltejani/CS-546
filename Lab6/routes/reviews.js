const { ObjectId } = require("bson");
const express = require("express");
const router = express.Router();
const data = require("../data");
const reviaewsDta = data.reviews;
//const restaurantsData = data.restaurants;
router.post("/:restaurantId", async (req, res) => {
    const newreviewdata = req.body;
    if (!req.params.restaurantId) {
        res.status(400).json({ error: "You must Supply and ID to get" });
        return;
    }
    if (!newreviewdata.title) {
        res.status(400).json({ error: "You must provide title " });
        return;
    }
    if (!newreviewdata.reviewer) {
        res.status(400).json({ error: "You must provide reviewer" });
        return;
    }
    if (!newreviewdata.rating) {
        res.status(400).json({ error: "You must provide rating" });
        return;
    }
    if (!newreviewdata.dateOfReview) {
        res.status(400).json({ error: "You must provide date of review" });
        return;
    }
    if (!newreviewdata.review) {
        res.status(400).json({ error: "You must provide review" });
        return;
    }

    try {
        const { title, reviewer, rating, dateOfReview, review } = newreviewdata;

        const newreview = await reviewsData.create(
            req.params.restaurantId,
            title,
            reviewer,
            rating,
            dateOfReview,
            review
        );
        res.status(200).json(newreview);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

router.get("/:restaurantId", async (req, res) => {
    if (!req.params.restaurantId) {
        res.status(404).json({ error: "You must Supply and ID to get" });
        return;
    }
    try {
        const reviews = await reviewsData.getAll(req.params.restaurantId);
        res.status(200).json(reviews);
    } catch (e) {
        // Something went wrong with the server!
        res.status(404).send();
    }
});

router.get("/review/:reviewId", async (req, res) => {
    if (!req.params.reviewId) {
        res.status(400).json({ error: "You must Supply and ID to get" });
        return;
    }
    try {
        const reviewbyid = await reviewsData.get(req.params.reviewId);
        res.json(reviewbyid);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.delete("/:reviewId", async (req, res) => {
    if (!req.params.reviewId) {
        res.status(400).json({ error: "You must Supply and ID to delete" });
        return;
    }
    try {
        await reviewsData.get(req.params.reviewId);
    } catch (e) {
        res.status(500).json({ error: "post not found" });
    }
    try {
        const abc = await reviewsData.remove(req.params.reviewId);
        res.status(200).json(abc);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
module.exports = router;
