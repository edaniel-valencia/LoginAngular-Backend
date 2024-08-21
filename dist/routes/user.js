"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.post("/api/user/create", user_1.CreateUser);
router.post("/api/user/login", user_1.LoginUser);
exports.default = router;
