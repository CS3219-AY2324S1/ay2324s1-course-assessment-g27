import { Question } from "../../state/question";
import { API_URL } from "../config";

export async function createQuestion(newData: Partial<Question>, token : any) {
    const response = await fetch(`${API_URL}/questions`, {
        method: "POST",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newData),
    });
    return response.json();
}