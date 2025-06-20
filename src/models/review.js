import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    movieId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    reviewText: { type: String, required: true },
    score: { type: Number, required: true }
  },
  { timestamps: true } // Correct placement for timestamps
);

const Review = mongoose.model("review", ReviewSchema);
export default Review;
