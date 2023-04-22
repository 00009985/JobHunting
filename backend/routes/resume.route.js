import express from "express";
import { createResume, deleteResume, getResume, getResumes } from "../controllers/resume.controller.js";
import {verifyToken}  from "../middlewares/jwt.js"

const router = express.Router();

router.post("/", verifyToken, createResume);
router.delete("/:id", verifyToken, deleteResume);
router.get("/single/:id", getResume);
router.get("/", getResumes);

export default router;