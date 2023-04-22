import jobModel from "../models/job.model.js";
import Job from "../models/job.model.js"
import createError from "../utils/error.js";

export const createJob = async (req, res, next) => {
    if (!req.isRecruiter)
        return next(createError(403, "no access"));

    const newJob = new Job({
        companyId: req.userId,
        ...req.body,
    });

    try {
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (err) {
        next(err)
    }
};

export const deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job.companyId != req.userId) 
            return next(createError(403, "You can delete only your job"));
        await Job.findByIdAndDelete(req.params.id)
            res.status(200).send("Job has been deleted")
        } catch (error) {
        next(error)
    }
};

export const getJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id)
        if(!job) next(createError(403, "Job not found"))

        res.status(200).send(job)
    } catch (error) {
        next(error)
    }
};

export const getJobs = async (req, res, next) => {
    const q = req.query;
    const filters = {
        ...(q.Category && {Category: q.Category}),
        ...(q.companyId && { companyId: q.companyId}),
        ...((q.min || q.max) && {
            Salary: { ...(q.min && {$gt: q.min}), ...(q.max && {$lt: q.max}) }}),
        ...(q.search && {jobName: { $regex: q.search, $options: "i"}}),
    }
    try {
        const jobs = await Job.find(filters).sort({ [q.sort]: -1});
        res.status(200).send(jobs)
    } catch (error) {
        next(error)
    }
};