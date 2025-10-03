let products = [];
let nextId = 0;

const createProduct = (req, res) => {
  try {
    const { name, description, stock_quantity, low_stock_threshold } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Invalid product name" });
    }
    if (stock_quantity == null || stock_quantity < 0) {
      return res.status(400).json({ error: "Invalid product stock quantity" });
    }

    const newProduct = {
      id: nextId++,
      name,
      description: description || "",
      stock_quantity,
      low_stock_threshold: low_stock_threshold || 0,
    };

    products.push(newProduct);
    res.status(201).json({ message: "Created successfully", newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const getAllProducts = (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, stock_quantity, low_stock_threshold } = req.body;

    const product = products.find((p) => p.id === parseInt(id));
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (name) product.name = name;
    if (stock_quantity != null) product.stock_quantity = stock_quantity;
    if (low_stock_threshold != null)
      product.low_stock_threshold = low_stock_threshold;

    res.status(200).json({ message: "Updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const deleteProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1)
      return res.status(404).json({ error: "Product not found" });

    const deletedProduct = products.splice(index, 1)[0];
    res.status(200).json({ message: "Deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const increaseStock = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { amount } = req.body;

    if (amount == null || amount <= 0)
      return res.status(400).json({ error: "Invalid amount" });

    const product = products.find((p) => p.id === id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.stock_quantity += amount;

    res.json({ message: "Increased successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const decreaseStock = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { amount } = req.body;

    if (amount == null || amount <= 0)
      return res.status(400).json({ error: "Invalid amount" });

    const product = products.find((p) => p.id === id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.stock_quantity < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient stock available" });
    }

    product.stock_quantity -= amount;

    res.json({ message: "Decreased successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const getLowStockProducts = (req, res) => {
  try {
    const lowStockProducts = products.filter(
      (p) => p.stock_quantity < p.low_stock_threshold
    );
    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  decreaseStock,
  deleteProduct,
  increaseStock,
  getLowStockProducts,
};
