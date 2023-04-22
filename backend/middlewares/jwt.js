import createError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "You are not authenticated!"));
    
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(createError(403, "Token is not valid"));
        req.userId = payload.id;
        req.isRecruiter = payload.isRecruiter;
        //if does not include it, route can not move to the next function
        next()
    });
}