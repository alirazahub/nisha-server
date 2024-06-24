import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';

export const addProduct = asyncHandler(async (req, res) => {
    const { name, price } = req.body;

    try {
        const newProduct = await Product.create({
            name,
            price,
        })
        await newProduct.save()
        res.status(201).json({ message: 'Product created successfully', status: true })
    } catch (error) {
        res.status(500).json({ message: error.message, status: false })
    }
})

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    if (products) {
        res.status(200).json({ products, status: true })
    }
    else {
        res.status(401).json({ message: "Invalid products Data!" })
    }
})
export const deleteProduct = asyncHandler(async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message:"Deleted Successfully!", status: true })
    } catch (error) {

        res.status(200).json({ error, status: true })
    }
})