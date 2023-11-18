import axios from "axios";
import { QUESTION_SERVICE_GET_QUESTION_URL } from "../../config";

export async function getQuestionList(token : any) {
    const response = await fetch(`${QUESTION_SERVICE_GET_QUESTION_URL}`, {
        method: "GET",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
        
    });
    return response.json();
}

export async function getQuestionById(questionId:any, token : any) {
    const response = await fetch(`${QUESTION_SERVICE_GET_QUESTION_URL}/${questionId}`, {
        method: "GET",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
        
    });
    return response.json();
}

export const getRandQuestion = async (difficulty:string, token:any) => {
    const response = await axios.get(`${QUESTION_SERVICE_GET_QUESTION_URL}`, 
    { 
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        }
    });
    const filteredQuestions = response.data.filter((question: { difficulty: any; }) => question.difficulty === difficulty);
    return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
}