import { Router } from "express";
import { ReadRole } from "../controllers/role";

const router = Router();

router.get("/api/rol/read", ReadRole)


export default router
