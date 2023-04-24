import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
              return v !== "" ? /\+\d{12}/.test(v) : true;
            },
            msg: "Phone number is invalid!",
          },
    },
    desc:{
        type: String,
        required: false,
    },
    isRecruiter: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
}
);

export default mongoose.model("User", UserSchema)