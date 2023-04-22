import createError from "../utils/error.js"
import Application from '../models/application.model.js'
import Job from '../models/job.model.js'

export const createApplication = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.jobId)
        const newApplication = new Application({
            jobId: job._id,
            jobName: job.jobName,
            Salary: job.Salary,
            CompanyId: job.companyId,
            ApplicantId: req.userId,
        })

        await newApplication.save();
        res.status(200).send("successful");
    } catch (error) {
        next(error)
    }    
}

export const getApplications = async (req, res, next) => {
    try {
        const applications = await Application.find({
            ...(req.isRecruiter ? {ApplicantId: req.userId} : {companyId: req.companyId}),
            isApplyed: true,
        })

        res.status(200).send(applications)
        
    } catch (error) {
        next(error)
    }    
}