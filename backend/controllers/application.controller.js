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

export const applyForJob = async (req, res, next) => {
    const user = req.user;
    const data  = req.body;
    const jobId = req.params.jobId
    if (req.isRecruiter){
        res.status(401).json({
            message: "You don't have permissions to apply for a job",
          });
          return;
    }
    
    Application.findOne({
        ApplicantId: user._id,
        jobId: jobId,
        status: {
            $nin: ["deleted", "accepted", "cancelled"]
        },
    }).then((appliedApplication) => {
        console.log(appliedApplication);
        if(appliedApplication !== null){
            res.status(400).json({
                message: "You have applied"
            })
            return
        }

        Job.findOne({ _id: jobId})
            .then((job) => {
                if(job === null){
                    res.status(400).json({
                        message: "Job does not exist"
                    })
                    return
                }
                Application.countDocuments({
                    jobId: jobId,
                    status: {
                        $nin: ["rejected", "deleted", "cancelled", "finished"],
                    },
                }).then((activeApplicationCount) => {
                    if(activeApplicationCount < job){
                        
                    }
                })
            })
    })
}