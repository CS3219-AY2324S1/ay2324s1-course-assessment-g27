import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    question_title: {
      type: String,
      required: true
    },
    question_difficulty: {
        type: String,
        required: true
    },
    question_description: {
      type: String,
      required: true
    },
    question_examples: {
      type: Array,
      default: []
    },
    question_constraints: {
      type: Array,
      default: []
    },
    users: {
      type: Array,
      default: []
    }
  }, 
  { timestamps: true}
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
