"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_1 = require("../controllers/rol");
const router = (0, express_1.Router)();
router.get("/api/rol/read", rol_1.ReadRole);
exports.default = router;
