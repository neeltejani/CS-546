const express = require("express");
const router = express.Router();
const data = require("../data");
const restaurantsData = data.restaurants;

router.get("/", async (req, res) => {
    try {
        const allResturants = await restaurantsData.getAll();
        res.status(200).json(allResturants);
    } catch (e) {
        res.status(404).json({ message: "NOT FOUND" });
    }
});

router.get("/:id", async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "You must Supply and ID to get" });
        return;
    }
    try {
        const restaurantbyid = await restaurantsData.get(req.params.id);
        res.json(restaurantbyid);
        res.sendStatus(200);
    } catch (e) {
        res.status(404).json({ error: "restaurant with this id not found" });
    }
});

router.post("/", async (req, res) => {
    const newrestdata = req.body;
    if (!newrestdata.name) {
        res.status(400).json({ error: "You must provide name " });
        return;
    }
    if (!newrestdata.location) {
        res.status(400).json({ error: "You must provide location" });
        return;
    }
    if (!newrestdata.phoneNumber) {
        res.status(400).json({ error: "You must provide phone number" });
        return;
    }
    if (!newrestdata.website) {
        res.status(400).json({ error: "You must provide website" });
        return;
    }
    if (!newrestdata.priceRange) {
        res.status(400).json({ error: "You must provide pricerange" });
        return;
    }
    if (!newrestdata.cuisines) {
        res.status(400).json({ error: "You must provide poster ID" });
        return;
    }
    if (!newrestdata.serviceOptions) {
        res.status(400).json({ error: "You must provide serviceOptions" });
        return;
    }
    try {
        const {
            name,
            location,
            phoneNumber,
            website,
            priceRange,
            cuisines,
            serviceOptions,
        } = newrestdata;
        const newRestaurant = await restaurantsData.create(
            name,
            location,
            phoneNumber,
            website,
            priceRange,
            cuisines,
            serviceOptions
        );
        res.status(200).json(newRestaurant);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.delete("/:id", async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "You must Supply and ID to delete" });
        return;
    }
    try {
        await restaurantsData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "post not found" });
    }
    try {
        await restaurantsData.remove(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
router.put("/:id", async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "id not entered" });
    }
    const updateddata = req.body;
    //console.log(updateddata.name);
    try {
        await restaurantsData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "restaurant with this id not found" });
    }

    try {
        const final = await restaurantsData.update(
            req.params.id,
            updateddata.name,
            updateddata.location,
            updateddata.phoneNumber,
            updateddata.website,
            updateddata.priceRange,
            updateddata.cuisines,
            // updateddata.overallRating,
            updateddata.serviceOptions
            // updateddata.reviews
        );
        res.status(200).json(final);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
module.exports = router;
