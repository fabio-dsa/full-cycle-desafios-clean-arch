import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";
const product1 = ProductFactory.createTypeA(
    "PS5",
    3500
);

const product2 = ProductFactory.createTypeA(
    "Xbox Series X",
    4000
);

const product3 = ProductFactory.createTypeA(
    "Nintendo Switch",
    2.349
);

const allProducts = [product1, product2, product3]

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2, product3])),
    };
};

describe("Unit test for listing product use case", () => {
    it("should list all products", async () => {
        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository);

        const output = await useCase.execute();

        expect(output.products.length).toBe(3);

        output.products.forEach((p, index) => {
            expect(p.id).toEqual(expect.any(String));
            expect(p.name).toEqual(allProducts[index].name);
            expect(p.price).toEqual(allProducts[index].price);
        });
    });
});
