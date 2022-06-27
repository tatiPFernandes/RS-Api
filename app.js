const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");
//const { json } = require("express");

const app = express();

app.use(express.json())
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


app.post('/products', (req, res) => {

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
app.get("/products", (req, res) => {
    return res.json(products)
})

//Getting the data by its stock_number
app.get("/products/:stock_number", (req, res) => {

    const { stock_number } = req.params;
    const product = products.find((product) => product.stock_number === stock_number)
    return res.json(product)
})

//Finding the data by its stock_number and updating
app.put("/products/:stock_number", (req, res) => {
    const { stock_number } = req.params;
    const { name, description, price } = req.body;

    const productIndex = products.findIndex(product => product.stock_number === stock_number);

    products[productIndex] = {
        ...products[productIndex],
        name,
        description,
        price,
    };
    productFile();
    return res.json({ message: "Product succesfully updated" })
})

app.delete("/products/:stock_number", (req, res) => {
    const { stock_number } = req.params;
    const productIndex = products.findIndex((product) => product.stock_number === stock_number)
    products.splice(productIndex, 1);

    return res.json({ message: "Product succesfully deleted" })
})


app.listen(8080, console.log('Server is running on port 8080'))
