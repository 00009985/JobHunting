import createError from "../utils/error.js"
import Review from "../models/review.model.js"

export const createReview = async (req, res, next) => {
    if(req.isRecruiter)
    return next(createError(403, "Recruiters cannot leave a review"))

    const newReview = new Review({
        userId: req.userId,
        jobId: req.body.jobId,
        description: req.body.description,
        location: req.body.location,
    })
    try {
        const review = await Review.findOne({
            jobId: req.body.jobId,
            userId: req.body.userId
        })

        if (review)
            return next(createError(403, "You have already left a review"))
        const savedReview = await newReview.save();

        res.status(201).send(savedReview);
    }  catch (error) {
        next(error)
       }
}


export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({jobId: req.params.jobId})
        res.status(200).send(reviews);

    } catch (error) {
        next(error)
    }
}


export const deleteReview = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
