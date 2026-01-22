import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    // userId stores the _id of the logged-in user
	// That _id comes from your User collection
	// It creates a relationship between Session and User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }  //It added automatically created_At and updated_At
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;