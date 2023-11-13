import { API_URL } from "../config";

export async function getQuestionList(token : any) {
    const response = await fetch(`${API_URL}/questions`, {
        method: "GET",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
        
    });
    return response.json();
}

export async function getQuestionById(questionId:any, token : any) {
    const response = await fetch(`${API_URL}/questions/${questionId}`, {
        method: "GET",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
        
    });
    return response.json();
}