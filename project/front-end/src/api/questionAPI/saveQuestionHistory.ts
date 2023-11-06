import { HISTORY_SERVICE_URL } from "../../config";

export async function saveQuestionHistory(qnsId: String, id: Number, token : any) {
    try {
        const response = await fetch(`${HISTORY_SERVICE_URL}/users/${id}`, {
            method: "POST",
            headers: { 
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json"
            },
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