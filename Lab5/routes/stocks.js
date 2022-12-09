const express = require("express");
const router = express.Router();
const data = require("../data");
const stocksData = data.stocks;

router.get("/:id", async (req, res) => {
    try {
        const stockbyid = await stocksData.getStockById(req.params.id);
        res.json(stockbyid);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

router.get("/", async (req, res) => {
    try {
        const stock = await stocksData.getstocks();
        res.json(stock);
    } catch (e) {
        // Something went wrong with the server!
        res.status(500).send();
    }
});

module.exports = router;
