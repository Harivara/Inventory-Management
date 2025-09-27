let products = [];
let nextId = 0;

const createProduct = (req, res) => {
  const { name, description, stock_quantity, low_stock_threshold } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Invalid product name" });
  }
  if (!stock_quantity || stock_quantity < 0) {
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

};

const getAllProducts = (req, res) => {
  res.json(products);
};

const updateProduct = (req, res) => {
  const { id } = req.params;

  const { name, stock_quantity, low_stock_threshold } = req.body;
  const productIndex = parseInt(id);

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return res.status(404).json({ error: "Product not found" });

  if (name) product.name = name;
  if (stock_quantity != null) product.stock_quantity = stock_quantity;
  if (low_stock_threshold != null)
    product.low_stock_threshold = low_stock_threshold;

  res.status(200).json({ message: "Updated successfully", product });

};

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });
  
  const deletedProduct = products.splice(index, 1)[0];
  res.status(200).json({ message: "Deleted successfully", deletedProduct });
};

const increaseStock = (req, res) => {
  const id = parseInt(req.params.id);
  const { amount } = req.body;
  if (amount == null || amount <= 0)
    return res.status(400).json({ error: "Invalid amount" });

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return res.status(404).json({ error: "Product not found" });

  product.stock_quantity += amount;

  res.json({ message: "Increased successfully", product });

};

const decreaseStock = (req, res) => {
  const id = parseInt(req.params.id);
  const { amount } = req.body;
  if (amount == null || amount <= 0)
    return res.status(400).json({ error: "Invalid amount" });

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return res.status(404).json({ error: "Product not found" });

  if (product.stock_quantity < amount) {
    return res.status(400).json({ error: "Insufficient stock available" });
  }

  product.stock_quantity -= amount;

  res.json({ message: "Decreased successfully", product });

};

const getLowStockProducts = (req, res) => {
  const lowStockProducts = products.filter(
    (p) => p.stock_quantity < p.low_stock_threshold
  );
  res.json(lowStockProducts);
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
