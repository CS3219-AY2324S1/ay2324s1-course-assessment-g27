import { API_URL } from "../config";

export const deleteQuestionByID = async (questionId:any, token:any) => {
    try {
      const response = await fetch(`${API_URL}/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        return questionId; // Deletion successful
      } else {
        const errorMessage = `Error deleting question: ${response.statusText}`;
        throw new Error(errorMessage);
      }
    } catch (err:any) {
      throw new Error(`Error deleting question: ${err.message}`);
    }
  };