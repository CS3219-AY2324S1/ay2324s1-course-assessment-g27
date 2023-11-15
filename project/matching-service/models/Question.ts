import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
  }, 
  { timestamps: true}
);

export type QuestionModel = {
  _id: string,
  title: string,
  difficulty: string,
  description: string,
  tags: string,
  examples: Example[],
  constraints: string[],
}

type Example = {
  inputText: string,
  outputText:string,
  explanation:string,
  image:string,
}

const Question = mongoose.model("Question", questionSchema);
export default Question;
