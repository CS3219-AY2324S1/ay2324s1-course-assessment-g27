import axios from 'axios';
import { API_URL } from "../util/constant";

export const getQuestionList = async (difficulty:string, token:any) => {
    const response = await axios.get(`${API_URL}/questions`, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"} })
    const filteredQuestions = response.data.filter((question: { difficulty: any; }) => question.difficulty === difficulty);
    return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
}
