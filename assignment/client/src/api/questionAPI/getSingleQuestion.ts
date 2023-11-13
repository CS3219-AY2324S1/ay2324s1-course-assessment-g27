import { API_URL } from "../config";

export async function getSingleQuestion(questionId: any) {
    const response = await fetch(`${API_URL}/questions/${questionId}`, {
        method: "GET",
    });
    return response.json();
}