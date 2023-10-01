export interface Question {
  _id: string,
  title: string,
  difficulty: string,
  description: string,
  tags: string[],
  examples: Example[],
  constraints: string[],
}

export type Example = {
  inputText: string,
  outputText:string,
  explanation:string,
}