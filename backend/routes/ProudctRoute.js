import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProducts,
  GetProductById,
  UpdateProduct,
} from "../controllers/ProductContorller.js";
const router = express.Router();

router
  .route("/products")
  .get(GetAllProducts)
  .post(CreateProduct);

router
  .route("/products/:id")
  .get(GetProductById)
  .put(UpdateProduct)
  .delete(DeleteProduct);

export default router;
