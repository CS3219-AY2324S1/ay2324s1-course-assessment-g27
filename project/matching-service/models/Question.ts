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
