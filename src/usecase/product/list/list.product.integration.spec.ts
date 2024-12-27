import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list products use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const listUseCase = new ListProductUseCase(productRepository);

        const product1 = new Product("1", "PS5", 3.500);
        const product2 = new Product("2", "Xbox Series X", 4000);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const output = await listUseCase.execute();

        const allProducts = [product1, product2];

        output.products.forEach((p, index) => {
            expect(p.id).toEqual(expect.any(String));
            expect(p.name).toEqual(allProducts[index].name);
            expect(p.price).toEqual(allProducts[index].price);
        });
    });
});
