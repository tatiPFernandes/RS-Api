const request = require("supertest");
const app = require("./config/routes")

test("GET /products --> array of products", () => {

    return request(app)
        .get("/products")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        stock_number: expect.any(String),
                        name: expect.any(String),
                        description: expect.any(String),
                        price: expect.any(String)
                    })
                ])
            )
        })

});

test("GET /products/stock_number --> specific products by stock_number", () => {

    return request(app)
        .get("/products/1")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    //stock_number: expect.any(String),
                    name: expect.any(String),
                    description: expect.any(String),
                    price: expect.any(String)
                })

            )
        })

});


test("POST /products --> add products", () => {

    return request(app).post("/products").send({
        name: "Drill Driver",
        description: "Keyless 12V Drill driver, UK Plug",
        price: "£120.89"
    }).expect("Content-Type", /json/).expect(201)
        .then((response) => {
            expect(response.body).toEqual(

                expect.objectContaining({
                    //stock_number: expect.any(String),
                    name: "Drill Driver",
                    description: "Keyless 12V Drill Driver, UK Plug",
                    price: "£180.89"
                })

            )
        })

});

test("GET /products --> validates request body", () => {
    return request(app).post("/products")

})



