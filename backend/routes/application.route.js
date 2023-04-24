import express from "express";
import { createApplication, getApplications, applyForJob } from "../controllers/application.controller.js";
import {verifyToken} from "../middlewares/jwt.js";  

const router = express.Router();

router.post("/:jobId", verifyToken, createApplication)
router.get("/", verifyToken, getApplications)
router.post("/:jobId/applications", verifyToken, applyForJob)

export default router;