import mongoose from "mongoose";
const {Schema} = mongoose;

const ResumeSchema = new Schema({
    applicantId: {
        type: String,
        required: true,
    },
    resumeName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    workExperience: {
        type: String,
        required: true,
    },
    skills: {
        type: [],
        required: false,
    },
    letter: {
        type: String,
        required: false,
    },
},
{
    timestamps: true,
}
);

export default mongoose.model("Resume", ResumeSchema)