import mongoose from "mongoose";
const {Schema} = mongoose;

const ReviewSchema = new Schema({
    jobId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
}
);

export default mongoose.model("Review", ReviewSchema)