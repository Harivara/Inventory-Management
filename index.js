import express from "express";
import  Router from "express";
import productRoutes from "./Router/ProductRouter.js"

const app=express();
app.use(express.json());



app.use("/products",productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Inventory Management API listening on port ${PORT}`);
});