import { Question } from "../../state/question";
import { API_URL } from "../config";

export async function editQuestionById(questionId: any, updatedData: Partial<Question>, token: any) {
  const response = await fetch(`${API_URL}/questions/${questionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  return response;
  
};
