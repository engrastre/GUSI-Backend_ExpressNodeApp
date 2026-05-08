const express = require("express");
const router = express.Router();
const FormModel = require("../Models/flower");

router.post("/", async (req, res) => {
    try {
 
        const { customerName, quantity, deliveryAddress, flowerType } = req.body;

        const cleanFlowerType = flowerType ? flowerType.trim() : "";

        const validTypes = ['Juliet Rose', 'Royal Lilies', 'French Tulips', 'Golden Sun'];

        // 4. Validation Check
        if (!validTypes.includes(cleanFlowerType)) {
            console.log("Validation Failed! Natanggap na value:", `"${cleanFlowerType}"`);
            return res.status(400).json({ 
                error: "Invalid flower arrangement selected",
                received: cleanFlowerType 
            });
        }

        const newOrder = new FormModel({
            customerName,
            quantity,
            deliveryAddress,
            flowerType: cleanFlowerType 
        });

        // 6. Save sa MongoDB
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