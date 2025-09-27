let products=[];
let nextId = 0;


export const createProduct = (req, res) => {
    const { name, description, stock_quantity, low_stock_threshold } = req.body;
    if (!name) {
    return res.status(400).json({ error: "Invalid product name" });
    }
    if(!stock_quantity || stock_quantity<0){
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
    res.status(201).json(newProduct);
};


export const getAllProducts = (req,res) =>{
    res.json(products);
}

export const updateProduct = (req, res) => {

  const { id } = req.params;


  const { name, stock_quantity, low_stock_threshold } = req.body;
  const productIndex  = parseInt(id);

  if (!(productIndex) || productIndex < 0 || productIndex >= products.length) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (name) products[productIndex].name = name;
  if (stock_quantity != null) products[productIndex].stock_quantity = stock_quantity;
  if (low_stock_threshold!=null) products[productIndex].low_stock_threshold=low_stock_threshold;

  res.json(products[productIndex]);
};


export const deleteProduct =(req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(index, 1);
  res.status(204).send();
};

export const increaseStock =  (req, res) => {
  const id = parseInt(req.params.id);
  const { amount } = req.body;
  if (amount == null || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  const product = products[id];
  if (!product) return res.status(404).json({ error: 'Product not found' });

  product.stock_quantity += amount;
  res.json(product);
};

export const decreaseStock = (req, res) => {
  const id = parseInt(req.params.id);
  const { amount } = req.body;
  if (amount == null || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  const product = products[id];
  if (!product) return res.status(404).json({ error: 'Product not found' });

  if (product.stock_quantity < amount) {
    return res.status(400).json({ error: 'Insufficient stock available' });
  }

  product.stock_quantity -= amount;
  res.json(product);
};


export const getLowStockProducts=(req, res) => {
  const lowStockProducts = products.filter(p => p.stock_quantity < p.low_stock_threshold);
  res.json(lowStockProducts);
};


