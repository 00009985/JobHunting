import mongoose from "mongoose";
const {Schema} = mongoose;

const JobSchema = new Schema({
    companyId: {
        type: String,
        required: true,
    },
    jobName: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Salary: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    applyNumber: {
        type: Number,
        default: 0,
    },
    jobLocation: {
        type: String,
        required: false,
    },

    skills:{
        type: [],
        required: false,
    },
},
{
    timestamps: true,
}
);

export default mongoose.model("Job", JobSchema)