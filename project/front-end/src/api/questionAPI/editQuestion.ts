import { Question } from "../../state/question";
import { QUESTION_SERVICE_GET_QUESTION_URL } from "../../config";

export async function editQuestionById(questionId: any, updatedData: Partial<Question>, token: any) {
  const response = await fetch(`${QUESTION_SERVICE_GET_QUESTION_URL}/${questionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  return response;
};
