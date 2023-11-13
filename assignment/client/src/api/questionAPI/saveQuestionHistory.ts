import { API_URL } from "../config";

export async function saveQuestionHistory(qnsId: String, id: Number) {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: "POST",
            body: JSON.stringify(qnsId),
        });
        if (!response.ok) {
            throw new Error(`${await response.json()}`);
        }

        return await response.json(); 
    } catch (err:any) {
        throw new Error(`${err.message}`);
    }
}