import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
