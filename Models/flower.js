const mongoose = require("mongoose");

const flowerSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    quantity: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    flowerType: { 
        type: String, 
        required: true,
        enum: ['Juliet Rose', 'Royal Lilies', 'French Tulips', 'Golden Sun'] 
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", flowerSchema);