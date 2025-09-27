export const increaseStock = (product, amount) => {
  if (amount <= 0) throw new Error('Invalid amount');
  product.stock_quantity += amount;
}

export const decreaseStockStock = (product, amount) => {
  if (amount <= 0) throw new Error('Invalid amount');
  if (product.stock_quantity < amount) throw new Error('Insufficient stock');
  product.stock_quantity -= amount;
}


