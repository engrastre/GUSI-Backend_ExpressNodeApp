const express = require("express");
const router = express.Router();
const FormModel = require("../models/flower");

router.post("/", async (req, res) => {
    try {
        const { customerName, quantity, deliveryAddress, flowerType } = req.body;

        const validTypes = ['Juliet Rose', 'Royal Lilies', 'French Tulips', 'Golden Sun'];
        if (!validTypes.includes(flowerType)) {
            return res.status(400).json({ error: "Invalid flower arrangement selected" });
        }

        const newOrder = new FormModel({
            customerName,
            quantity,
            deliveryAddress,
            flowerType
        });

        await newOrder.save();
        console.log("Order saved to Database:", newOrder);
        res.status(200).json({ 
            message: "Order Submitted and Saved Successfully!",
            orderDetail: newOrder 
        });
    } catch (err) {
        console.error(" Error saving to DB:", err);
        res.status(500).json({ error: "Failed to save order" });
    }
});

module.exports = router;