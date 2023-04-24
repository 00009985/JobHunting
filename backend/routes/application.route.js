import express from "express";
import { createApplication, deleteApplication, getApplications} from "../controllers/application.controller.js";
import {verifyToken} from "../middlewares/jwt.js";  

const router = express.Router();

router.post("/:jobId", verifyToken, createApplication)
router.get("/", verifyToken, getApplications)
router.delete("/:id", verifyToken, deleteApplication);

export default router;