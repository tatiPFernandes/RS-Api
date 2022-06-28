const request = require("supertest");
const app = require("./config/routes")



test("POST /products --> add products", () => {

    const response = request(app).post("/products").send({
        name: "Drill Driver",
        description: "Keyless 12V Drill driver, UK Plug",
        price: "£120.89"
    }).expect("Content-Type", /json/).expect(201);
    expect(response.body).toEqual(

        expect.objectContaining({
            //stock_number: expect.any(String),
            name: "Drill Driver",
            description: "Keyless 12V Drill Driver, UK Plug",
            price: "£180.89"
        })

    );

});

test("GET /products --> array of products", async () => {

    const response = await request(app)
        .get("/products")
        .expect("Content-Type", /json/)
        .expect(200);
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                stock_number: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(String)
            })
        ])
    );

});

test("GET /products/stock_number --> specific products by stock_number", async () => {


    const response = await request(app)
        .get("/products/1")
        .expect("Content-Type", /json/)
        .expect(200);
    expect(response.body).toEqual(
        expect.objectContaining({
            //stock_number: expect.any(String),
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(String)
        })

    );

});



test("GET /products --> validates request body", () => {
    return request(app).post("/products")

})



