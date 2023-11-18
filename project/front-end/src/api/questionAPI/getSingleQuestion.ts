import { QUESTION_SERVICE_GET_QUESTION_URL } from "../../config";

export async function getSingleQuestion(token : any, questionId: any) {
    const response = await fetch(`${QUESTION_SERVICE_GET_QUESTION_URL}/${questionId}`, {
        method: "GET",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },   
    });
    return response.json();
}