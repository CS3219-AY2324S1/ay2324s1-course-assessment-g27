export interface Question {
  _id: string,
  title: string,
  difficulty: "EASY" | "MEDIUM" | "HARD",
  description: string,
  tags: string[],
  examples: string[],
  constraints: string[],
}
