const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },  // Change this from String to Number
    category: { type: String, required: true },
    userId: { type: String, required: true },
    company: { type: String, required: true },
    image: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
