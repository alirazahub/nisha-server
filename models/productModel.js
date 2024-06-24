import mongoose from 'mongoose'
const productScheme = mongoose.Schema({
    name: String,
    price: String,
}, {
    timestamps: true
}
)

const Product = mongoose.model('Product', productScheme);
export default Product;