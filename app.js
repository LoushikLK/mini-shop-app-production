//import express
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
//importing cors
const cors = require('cors');
//express middleware
app.use(express.static(__dirname + "/client/build"))

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

//routes for the app

const saveProduct = require("./routes/savingProduct")

const getProduct = require("./routes/gettingProduct")

const searchRoute = require("./routes/searchRoute")

app.use("/api/savingproduct", saveProduct);

app.use("/api/gettingproducts", getProduct);

app.use("/api/search", searchRoute);

app.get("/hello", (req, res) => {
    res.send("hello world");
})

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
})

app.listen(port, () => {
    console.log("server is running on port " + port);
})