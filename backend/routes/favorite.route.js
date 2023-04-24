import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import { findFavorited, findFavoriteNumber, addToFavorite, removeFromFavorite, getFavoriteJobs } from "../controllers/favorite.controller.js";

const router = express.Router();
router.post("/favoriteNumber", verifyToken, findFavoriteNumber)
router.post("/favorited", verifyToken, findFavorited)
router.post("/addToFavorite", verifyToken, addToFavorite)
router.post("/removeFromFavorite", verifyToken, removeFromFavorite)
router.post("/getFavoriteJobs", verifyToken, getFavoriteJobs)

export default router;