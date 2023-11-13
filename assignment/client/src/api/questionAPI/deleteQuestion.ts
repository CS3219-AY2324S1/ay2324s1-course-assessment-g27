import { API_URL } from "../config";

export const deleteQuestionByID = async (questionId:any) => {
    try {
      const response = await fetch(`${API_URL}/questions/${questionId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    
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