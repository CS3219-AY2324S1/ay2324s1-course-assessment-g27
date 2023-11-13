import { API_URL } from "../config";

export async function getQuestionList() {
    const response = await fetch(`${API_URL}/questions`, {
        method: "GET",  
    });
    return response.json();
}

export async function getQuestionById(questionId:any) {
    const response = await fetch(`${API_URL}/questions/${questionId}`, {
        method: "GET",
    });
    return response.json();
}