import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    question_id: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
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
