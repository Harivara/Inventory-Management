let ProductController;
let createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  increaseStock,
  decreaseStock,
  getLowStockProducts;

describe("ProductController", () => {
  let req, res;

  beforeEach(() => {
    jest.resetModules();
    ProductController = require("../Controller/ProductController");
    ({
      createProduct,
      getAllProducts,
      updateProduct,
      deleteProduct,
      increaseStock,
      decreaseStock,
      getLowStockProducts,
    } = ProductController);

    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  // CREATE PRODUCT
  test("createProduct adds a new product", () => {
    req.body = { name: "Test Product", stock_quantity: 10 };
    createProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Created successfully",
        newProduct: expect.objectContaining({
          name: "Test Product",
          stock_quantity: 10,
        }),
      })
    );
  });

  test("createProduct rejects invalid stock", () => {
    req.body = { name: "Bad Product", stock_quantity: -5 };
    createProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid product stock quantity",
    });
  });

  // GET ALL PRODUCTS
  test("getAllProducts returns products", () => {
    req.body = { name: "Prod", stock_quantity: 5 };
    createProduct(req, res);

    getAllProducts(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: "Prod" }),
      ])
    );
  });

  // UPDATE PRODUCT
  test("updateProduct updates product info", () => {
    req.body = { name: "Old Name", stock_quantity: 5 };
    createProduct(req, res);

    req.params = { id: "0" };
    req.body = { name: "New Name", stock_quantity: 15 };
    updateProduct(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Updated successfully",
        product: expect.objectContaining({
          name: "New Name",
          stock_quantity: 15,
        }),
      })
    );
  });

  test("updateProduct fails for invalid id", () => {
    req.params = { id: "999" };
    req.body = { name: "Whatever" };
    updateProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });

  // DELETE PRODUCT
  test("deleteProduct removes a product", () => {
    req.body = { name: "DeleteMe", stock_quantity: 1 };
    createProduct(req, res);

    req.params = { id: "0" };
    deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Deleted successfully" })
    );
  });

  test("deleteProduct fails for invalid id", () => {
    req.params = { id: "999" };
    deleteProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });

  // INCREASE STOCK
  test("increaseStock adds to product stock", () => {
    req.body = { name: "StockMe", stock_quantity: 5 };
    createProduct(req, res);

    req.params = { id: "0" };
    req.body = { amount: 10 };
    increaseStock(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Increased successfully",
        product: expect.objectContaining({ stock_quantity: 15 }),
      })
    );
  });

  test("increaseStock fails for invalid amount", () => {
    req.body = { name: "StockMe", stock_quantity: 5 };
    createProduct(req, res);

    req.params = { id: "0" };
    req.body = { amount: -3 };
    increaseStock(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid amount" });
  });

  // DECREASE STOCK
  test("decreaseStock subtracts from product stock", () => {
    req.body = { name: "StockMe", stock_quantity: 10 };
    createProduct(req, res);

    req.params = { id: "0" };
    req.body = { amount: 5 };
    decreaseStock(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Decreased successfully",
        product: expect.objectContaining({ stock_quantity: 5 }),
      })
    );
  });

  test("decreaseStock fails if insufficient stock", () => {
    req.body = { name: "StockMe", stock_quantity: 2 };
    createProduct(req, res);

    req.params = { id: "0" };
    req.body = { amount: 5 };
    decreaseStock(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Insufficient stock available",
    });
  });

  // LOW STOCK PRODUCTS
  test("getLowStockProducts returns products below threshold", () => {
    req.body = { name: "LowStock", stock_quantity: 2, low_stock_threshold: 5 };
    createProduct(req, res);

    getLowStockProducts(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: "LowStock" }),
      ])
    );
  });
});
