// tests/products.test.js
const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    describe('list', () => {
        it('should list all products', async () => {
            const products = await list();
            expect(products.length).toBe(2);
            expect(products[0].description).toBe('Product 1');
            expect(products[1].description).toBe('Product 2');
        });
    });

    describe('get', () => {
        it('should get a product by id', async () => {
            // Mock the Product.findById method to return a specific product
            mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

            // call to get the product using the `get` method
            const product = await get('abc123');
            expect(product).not.toBeNull();
            expect(mockModel.findById).toHaveBeenCalledWith('abc123');
        });
    });

    // This would delete the product after the first test, and fail every other test afterwards.
    describe('destroy', () => {
        it('should delete a product', async () => {
            mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

            // Assume there is a product with id 'abc123'
            const deletionResult = await destroy('1234');
            expect(deletionResult.deletedCount).toBe(1);
            expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: '1234' });
        });
    });
});