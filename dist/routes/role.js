"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_1 = require("../controllers/role");
const router = (0, express_1.Router)();
router.get("/api/rol/read", role_1.ReadRole);
exports.default = router;
