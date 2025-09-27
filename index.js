const express =require("express");
const Router =require("express");

const  productRoutes = require("./Router/ProductRouter")

const app=express();
app.use(express.json());



app.use("/products",productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Inventory Management API listening on port ${PORT}`);
});