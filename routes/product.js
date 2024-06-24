import express from "express";
import { addProduct,getProducts,deleteProduct} from "../controllers/product.js";

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/get-products", getProducts);
router.delete("/delete-product/:id", deleteProduct);


export default router;