import mongoose from 'mongoose';
const { Schema } = mongoose;

const ApplicationSchema = new Schema(
  {
    jobId: {
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
    status: {
      type: String,
      enum: [
        "applied", // when a applicant is applied
        "shortlisted", // when a applicant is shortlisted
        "accepted", // when a applicant is accepted
        "rejected", // when a applicant is rejected
        "deleted", // when any job is deleted
        "cancelled", // an application is cancelled by its author or when other application is accepted
        "finished", // when job is over
      ],
      default: "applied",
      required: true,
    },
    dateOfApplication: {
      type: Date,
      default: Date.now,
    },
    dateOfJoining: {
      type: Date,
      validate: [
        {
          validator: function (value) {
            return this.dateOfApplication <= value;
          },
          msg: "dateOfJoining should be greater than dateOfApplication",
        },
      ],
    },
    sop: {
      type: String,
      validate: {
        validator: function (v) {
          return v.split(" ").filter((ele) => ele != "").length <= 250;
        },
        msg: "Statement of purpose should not be greater than 250 words",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Application', ApplicationSchema);
