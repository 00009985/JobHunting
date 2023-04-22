import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

//fetching - get
//sending an input - post
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

export default router;