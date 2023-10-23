import { Example } from "./question";

export interface Room {
    _id: string,
    question_id:string,
    question_title: string,
    question_difficulty: string,
    question_description: string,
    question_examples: Example[],
    question_constraints: string[],
    users: string[]
}