export interface Question {
  _id: string,
  title: string,
  difficulty: string,
  description: string,
  tags: string[],
  examples: string[],
  constraints: string[],
}