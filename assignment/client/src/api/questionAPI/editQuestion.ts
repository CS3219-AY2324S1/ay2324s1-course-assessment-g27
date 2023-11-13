import { Question } from "../../state/question";
import { API_URL } from "../config";

export async function editQuestionById(questionId: any, updatedData: Partial<Question>) {
  const response = await fetch(`${API_URL}/questions/${questionId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return response;
  // if (response.ok) {
  //   return await response.json(); 
  // } else {
  //   throw new Error(`Error editing question: ${response.statusText}`);
  // }
  
};
