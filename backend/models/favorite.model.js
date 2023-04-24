import mongoose from "mongoose";
const {Schema} = mongoose;

const FavoriteSchema = new Schema({
    ApplicantId: {
        type: String,
    },
    jobId: {
        type:String,
    },
    jobName: {
        type:String,
    },
    jobSalary: {
        type:String,
    }
},
{
    timestamps: true,
}
);

export default mongoose.model("Favorite", FavoriteSchema)