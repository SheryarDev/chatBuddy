import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    resetPasswordToken:{
        type:String
    } ,
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Define a text index on the 'title' and 'content' fields
// userSchema.index({ name: 'text', });

export default mongoose.model("User", userSchema);
