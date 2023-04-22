import express from "express";
import {verifyToken} from "../middlewares/jwt.js"; 
import { sendEmail } from "../controllers/contact.controller.js";

const router = express.Router();
router.post("/contact", verifyToken, sendEmail)

export default router;
