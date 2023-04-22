import mongoose from "mongoose";
const {Schema} = mongoose;

const ConversationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    companyId: {
        type: String,
        required: true,
    },
    ApplicantId: {
        type: String,
        required: true,
    },
    readByCompany: {
      type: Boolean,
      required: true,
    },
    readByApplicant: {
      type: Boolean,
      required: true,
    },
    lastMessage:{
        type: String,
        required: false,
    }
    
},
{
    timestamps: true,
}
);

export default mongoose.model("Conversation", ConversationSchema)