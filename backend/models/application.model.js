import mongoose from 'mongoose';
const { Schema } = mongoose;

const ApplicationSchema = new Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    jobName: {
      type: String,
      required: true,
    },
    CompanyId: {
      type: String,
      required: true,
    },
    ApplicantId: {
      type: String,
      required: true,
    },
    Salary: {
      type: Number,
      required: true,
    },
    isApplyed:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Application', ApplicationSchema);
