import mongoose from "mongoose";
const {Schema} = mongoose;

const FavoriteSchema = new Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: "User"
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