import express from "express";
import { createApplication, getApplications } from "../controllers/application.controller.js";
import {verifyToken} from "../middlewares/jwt.js";  

const router = express.Router();

router.post("/:jobId", verifyToken, createApplication)
router.get("/", verifyToken, getApplications)

export default router;