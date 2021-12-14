const express = require('express');

const router = express.Router();

const productDb = require("../db/productDetails");


router.get('/', async (req, res) => {
    try {

        const searchTerm = req.query.searchterm;

        if (searchTerm !== "" || searchTerm !== undefined || searchTerm !== null) {
            const data = await productDb.find({ productName: { $regex: searchTerm, $options: 'i' } });

            if (!data) {

                res.status(404).json({ message: "No data found" });

            }
            else {
                res.status(200).json({ message: data });
            }

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });


    }


})

module.exports = router;