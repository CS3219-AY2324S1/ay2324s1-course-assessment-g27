import { API_URL } from "../config";

export async function getAttemptList(id: Number, token : any) {
    try {
        const response = await fetch(`${API_URL}/users/${id}/attempts`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {
            throw new Error(`${await response.json()}`);
        }

        return await response.json(); 
    } catch (err:any) {
        throw new Error(`${err.message}`);
    }
};

export async function getCompletedList(id: Number, token : any) {
    try {
        const response = await fetch(`${API_URL}/users/${id}/completed`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {
            throw new Error(`${await response.json()}`);
        }

        return await response.json(); 
    } catch (err:any) {
        throw new Error(`${err.message}`);
    }
};

export async function saveAttemptedQns(qnsId: String, id: Number, token : any) {
    try {
        const response = await fetch(`${API_URL}/users/${id}/attempts`, {
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
};

export async function saveCompletedQns(qnsId: String, id: Number, token : any) {
    try {
        const response = await fetch(`${API_URL}/users/${id}/completed`, {
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
};