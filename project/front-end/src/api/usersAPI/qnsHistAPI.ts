import { HISTORY_SERVICE_URL } from "../../config";

export async function getAttemptList(id: number, token : any) {
    const response = await fetch(`${HISTORY_SERVICE_URL}/users/${id}/attempts`, {
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
}

export async function saveAttemptedQns(attempt: string, qid: string, id: number, token : any) {
    const response = await fetch(`${HISTORY_SERVICE_URL}/users/${id}/attempts`, {
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
    console.log("saved attempt");
    return await response.json(); 
}

export async function completeQns(isCompleted: boolean, qid: string, id: number, token : any) {
    const response = await fetch(`${HISTORY_SERVICE_URL}/users/${id}/attempts`, {
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
}
