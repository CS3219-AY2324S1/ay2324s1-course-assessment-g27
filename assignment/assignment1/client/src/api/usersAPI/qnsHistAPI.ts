import { API_URL } from "../config";

export async function getAttemptList(id: Number, token : any) {
    try {
        const response = await fetch(`${API_URL}/users/${id}/attempts`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
        });
        if (!response.ok) {
            throw new Error(`${await response.json()}`);
        }

        return await response.json(); 
    } catch (err:any) {
        throw err;
    }
};

export async function saveAttemptedQns(attempt: String, qid: String, id: Number, token : any) {
    try {
        const response = await fetch(`${API_URL}/users/${id}/attempts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            body: JSON.stringify({
                qid,
                attempt
            }),
        });
        if (!response.ok) {
            throw new Error(`${await response.json()}`);
        }

        return await response.json(); 
    } catch (err:any) {
        throw err;
    }
};

export async function completeQns(isCompleted: Boolean, qid: String, id: Number, token : any) {
    try {
        const response = await fetch(`${API_URL}/users/${id}/attempts`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            body: JSON.stringify({
                qid,
                isCompleted
            }),
        });
        if (!response.ok) {
            throw new Error(`${await response.json()}`);
        }

        return await response.json(); 
    } catch (err:any) {
        throw err;
    }
};
