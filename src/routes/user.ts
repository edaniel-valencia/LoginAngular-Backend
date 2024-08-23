import { Router } from "express";
import { CreateUser, LoginUser } from "../controllers/user";

const router = Router();

router.post("/api/user/register", CreateUser)
router.post("/api/user/login", LoginUser)


export default router
