import { Question } from "../../state/question";
import { API_URL } from "../config";

export const editQuestionById = async (questionId: any, updatedData: Partial<Question>, token: any) => {
  try {
    const response = await fetch(`${API_URL}/questions/${questionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      return await response.json(); 
    } else {
      throw new Error(`Error editing question: ${response.statusText}`);
    }
  } catch (err:any) {
    throw new Error(`Error editing question: ${err.message}`);
  }
};
