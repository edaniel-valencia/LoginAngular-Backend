import { Router } from "express";
import { CreateUser, LoginUser, ReadUser } from "../controllers/user";

const router = Router();

<<<<<<< HEAD
router.get("/api/user/read", ReadUser)
router.post("/api/user/create", CreateUser)
=======
router.post("/api/user/register", CreateUser)
>>>>>>> 13463c3c35e991302bc3006ca87468f85b5b63f6
router.post("/api/user/login", LoginUser)


export default router
