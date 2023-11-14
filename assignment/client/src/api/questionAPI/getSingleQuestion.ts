import { API_URL } from "../config";

export async function getSingleQuestion(token : any, questionId: any) {
    const response = await fetch(`${API_URL}/questions/${questionId}`, {
        method: "GET",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },   
    });
    return response.json();
}