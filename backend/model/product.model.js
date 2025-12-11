import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    productImages: {
        type: [String],
        default: ['productImage.png'],
    },
    stock: {
        type: Number,
        default: 0,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    brand: {
        type: String,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
