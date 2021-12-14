const express = require('express');

const router = express.Router();

const productDb = require("../db/productDetails")


router.post('/', async (req, res) => {

    try {

        const { name, price, description, category, image, rating } = req.body;

        const product = new productDb({
            productName: name,
            productPrice: price,
            productDescription: description,
            catagory: category,
            productImage: image,
            rating: rating
        });

        await product.save();

        console.log("Product Saved");

        res.status(200).json({
            message: 'Product saved successfully'
        });


    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error saving product'
        });

    }
})

module.exports = router;