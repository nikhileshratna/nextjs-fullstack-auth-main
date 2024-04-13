import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
        
    },
    price: {
        type: Number,
        required: [true],
    },
    thumbnail: {
        type: String,
        required: [true],
    },
})

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;