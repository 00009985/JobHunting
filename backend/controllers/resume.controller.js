import Resume from "../models/resume.model.js"
import createError from "../utils/error.js";

export const createResume = async (req, res, next) => {
    if (req.isRecruiter)
        return next(createError(403, "no access"));

    const newResume = new Resume({
        applicantId: req.userId,
        ...req.body,
    });

    try { 
        const savedResume = await newResume.save();
        res.status(201).json(savedResume);
    } catch (err) {
        next(err)
    }
};

export const deleteResume = async (req, res, next) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (resume.applicantId != req.userId) 
            return next(createError(403, "You can delete only your resume"));
        await Resume.findByIdAndDelete(req.params.id)
            res.status(200).send("Resume has been deleted")
        } catch (error) {
        next(error)
    }
};

export const getResume = async (req, res, next) => {
    try {
        const resume = await Resume.findById(req.params.id)
        if(!resume) next(createError(403, "Resume not found"))

        res.status(200).send(resume)
    } catch (error) {
        next(error)
    }
};

export const getResumes = async (req, res, next) => {
    const q = req.query;
    try {
        const resumes = await Resume.find().sort({ [q.sort]: -1});
        res.status(200).send(resumes)
    } catch (error) {
        next(error)
    }
};