import { Router } from "express";
import { CreateProduct, ReadIdProductId, ReadProduct, UpdateProduct } from "../controllers/product";
import validateToken from "./validateToken";

const router = Router();

router.get("/api/product/read", validateToken, ReadProduct)
router.get("/api/product/read/:Pid", ReadIdProductId)
router.patch("/api/product/update/:Pid", UpdateProduct)
router.post("/api/product/create", CreateProduct)

export default router