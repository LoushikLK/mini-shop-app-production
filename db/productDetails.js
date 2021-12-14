const mongoose = require('mongoose');

//mongo db connection
mongoose.connect("mongodb+srv://lk:lk@cluster0.we7oh.mongodb.net/fruitDetails?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('connected to mongodb');
}).catch((err) => {
    console.log(err);
});

//creating schema for product details
const productDetailsSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    rating: {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 1
    }

});

//creating model for product details
const productDetails = mongoose.model('productDetails', productDetailsSchema);


module.exports = productDetails;