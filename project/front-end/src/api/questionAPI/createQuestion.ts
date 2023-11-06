import { Question } from "../../state/question";
import { QUESTION_SERVICE_GET_QUESTION_URL } from "../../config";

export async function createQuestion(newData: Partial<Question>, token : any) {
    const response = await fetch(`${QUESTION_SERVICE_GET_QUESTION_URL}`, {
        method: "POST",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newData),
    });
    return response;
}