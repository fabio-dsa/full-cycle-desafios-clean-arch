import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => { await sequelize.close(); });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({ type: "a", name: "Product 1", price: 100 });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: expect.any(String), name: "Product 1", price: 100 });
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({ type: "a", name: "Product Error" });

        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const resProduct1 = await request(app)
            .post("/product")
            .send({ type: "a", name: "Product 1", price: 100 });

        const resProduct2 = await request(app)
            .post("/product")
            .send({ type: "a", name: "Product 2", price: 80 });

        const responseList = await request(app).get("/product").send();

        responseList.body.products[0]
        expect(responseList.status).toBe(200);
        expect(responseList.body.products.length).toEqual(2);
        expect(responseList.body.products[0]).toEqual(resProduct1.body);
        expect(responseList.body.products[1]).toEqual(resProduct2.body);

    });
});