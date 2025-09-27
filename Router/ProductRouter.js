import express from "express";

import { createProduct, decreaseStock, deleteProduct, getAllProducts, getLowStockProducts, increaseStock, updateProduct } from "../Contoller/ProductController.js";

const router=express.Router()

router.post("/create-product",createProduct)
router.get("/get-all-products",getAllProducts)
router.put("/update-product/:id",updateProduct)
router.delete("/delete-product/:id",deleteProduct)
router.post("/increase-stock/:id",increaseStock)
router.post("/decrease-stock/:id",decreaseStock)
router.get("/low-stock",getLowStockProducts)


export default router