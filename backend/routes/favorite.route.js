import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import { deleteFavorited, findFavorited, getFavorited} from "../controllers/favorite.controller.js";

const router = express.Router();
router.post("/:jobId", verifyToken, findFavorited)
router.get("/", verifyToken, getFavorited)
router.delete("/:id", verifyToken, deleteFavorited);


export default router;