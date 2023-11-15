export interface Question {
  _id: string,
  title: string,
  difficulty: string,
  description: string,
  tags: string,
  examples: Example[],
  constraints: string[],
}

export interface QuestionHistory {
  _id: string,
  title: string,
  difficulty: string,
  description: string,
  tags: string,
  examples: Example[],
  constraints: string[],
  date: Date, // date attempted/completed
  attempt: String,
  isCompleted: boolean,
}

export type Example = {
  inputText: string,
  outputText:string,
  explanation:string,
  image:string,
}
