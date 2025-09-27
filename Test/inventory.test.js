
import { increaseStock,decreaseStockStock } from "./inventoryLogic.js";

describe('Stock Management', () => {
  test('increaseStock adds to stock', () => {
    const product = { stock_quantity: 10 };
    increaseStock(product, 5);
    expect(product.stock_quantity).toBe(15);
  });

  test('decreaseStock reduces stock', () => {
    const product = { stock_quantity: 10 };
    decreaseStock(product, 4);
    expect(product.stock_quantity).toBe(6);
  });

  test('decreaseStock throws error if insufficient stock', () => {
    const product = { stock_quantity: 5 };
    expect(() => decreaseStock(product, 10)).toThrow('Insufficient stock');
  });

  test('cannot decrease stock below zero', () => {
    const product = { stock_quantity: 0 };
    expect(() => decreaseStock(product, 1)).toThrow('Insufficient stock');
  });
});
