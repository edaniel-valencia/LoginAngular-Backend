"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
<<<<<<< HEAD
router.get("/api/user/read", user_1.ReadUser);
router.post("/api/user/create", user_1.CreateUser);
=======
router.post("/api/user/register", user_1.CreateUser);
>>>>>>> 13463c3c35e991302bc3006ca87468f85b5b63f6
router.post("/api/user/login", user_1.LoginUser);
exports.default = router;
