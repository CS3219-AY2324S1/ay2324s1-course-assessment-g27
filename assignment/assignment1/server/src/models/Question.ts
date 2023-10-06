import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    examples: {
      type: Array,
      default: []
    },
    constraints: {
      type: Array,
      default: []
    },
    tags: {
      type: String,
    },
    // picturePath: String,
    // likes: {
    //   type: Number,
    //   default: 0
    // },
    // dislikes: {
    //   type: Number,
    //   default: 0
    // },
  }, 
  { timestamps: true}
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
