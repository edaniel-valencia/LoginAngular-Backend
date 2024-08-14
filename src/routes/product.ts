import { Router } from "express";
import { getProducts } from "../controllers/product";
import validateToken from "./validateToken";

const router = Router();

router.get("/api/product/getProducts", validateToken, getProducts)

export default router