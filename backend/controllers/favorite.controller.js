import Favorite from "../models/favorite.model.js"
import Job from '../models/job.model.js'


export const findFavorited = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.jobId)
        const newFavorite = new Favorite({
            jobId: job._id,
            jobName: job.jobName,
            jobSalary: job.Salary,
            ApplicantId: req.userId,
        })
        await newFavorite.save();
        res.status(200).send("successful");
    } catch (error) {
        next(error)
    }    
    
};


export const getFavorited = async (req, res, next) => {
    try {
        const favorites = await Favorite.find(req.params.id)

        res.status(200).send(favorites)
        
    } catch (error) {
        next(error)
    }    
}

export const deleteFavorited = async (req, res, next) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (favorite.ApplicantId != req.userId) 
            return next(createError(403, "You can delete only your favorite"));
        await Favorite.findByIdAndDelete(req.params.id)
            res.status(200).send("Favorite has been deleted")
        } catch (error) {
        next(error)
    }
};

