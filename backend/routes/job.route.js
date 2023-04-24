import express from "express";
import { createJob, deleteJob, getJob, getJobs, getmyJobs, updateJob} from "../controllers/job.controller.js";
import {verifyToken}  from "../middlewares/jwt.js"

const router = express.Router();

router.post("/", verifyToken, createJob);
router.delete("/:id", verifyToken, deleteJob);
router.put("/update/:id", verifyToken, updateJob);
router.get("/single/:id", getJob);
router.get("/", getJobs);
router.get("/myJobs", verifyToken, getmyJobs);

export default router;