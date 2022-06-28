const express = require("express");
const routes = express.Router()
const { randomUUID } = require("crypto");
const fs = require("fs");
const app = express()



let products = [];

//this function creates a file to store data.
const productFile = () => {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Product succesfully created")
        }
    })
}
//Putting the data file into products array
fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        products = JSON.parse(data)
    }
})


routes.post('/products', (req, res, next) => {

    const { stock_number, name, description, price } = req.body;

    const product = {
        stock_number: randomUUID(),
        name,
        description,
        price

    };
    products.push(product)
    productFile();

    return res.json(products);
})


//Getting all the datas
routes.get("/products", (req, res, next) => {
    return res.json(products)
})

//Getting the data by its stock_number
routes.get("/products/:stock_number", (req, res, next) => {

    //const { stock_number } = req.params;
    const product = products.find((product) => product.stock_number === req.params.stock_number)

    return res.json(product)
})

//Finding the data by its stock_number and updating
routes.put("/products/:stock_number", (req, res) => {

    //const { stock_number } = req.params;
    const { name, description, price } = req.body;
    const productIndex = products.findIndex(product => product.stock_number === req.params.stock_number);

    products[productIndex] = {
        ...products[productIndex],
        name,
        description,
        price,
    };
    productFile();
    return res.status(201).json({ message: "Product succesfully updated" })
})


module.exports = app
module.exports = routes
