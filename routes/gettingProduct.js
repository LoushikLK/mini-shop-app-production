const express = require('express');

const router = express.Router();

const productDb = require("../db/productDetails")

router.get('/', async (req, res) => {

    try {



        let category = req.query.category;




        if (category) {

            if (category === "All") {
                const data = await productDb.find();

                if (!data) {
                    res.status(500).json({
                        message: "Internal Server Error"
                    });
                }
                res.status(200).json({

                    message: data
                });
            }
            else {
                const data = await productDb.find({ catagory: category });

                if (!data) {
                    res.status(500).json({
                        message: "Internal Server Error"
                    });
                }
                res.status(200).json({

                    message: data
                });

            }
        }
        else {
            res.status(400).json({
                message: "Bad Request"
            });
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        });
    }



})

module.exports = router;