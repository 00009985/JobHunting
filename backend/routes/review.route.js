import express from "express";
import { createReview, getReviews, deleteReview } from "../controllers/review.controller.js";
import {verifyToken} from "../middlewares/jwt.js"

const router = express.Router();

router.post("/", verifyToken, createReview)
//jobid
router.get("/:jobId", getReviews)
//reviewid
router.delete("/:id", deleteReview)

export default router;