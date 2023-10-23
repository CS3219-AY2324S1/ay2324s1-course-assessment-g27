import { API_URL } from "../config";

export async function registerUser(username: String, password: String) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            // body: formData,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        if (!response.ok) {
            throw new Error(`${await response.json()}`)
        }
        // if (response.ok) {
        //     return await response.json(); 
        // } else {
        //     throw new Error(`${response}`);
        // }
        return await response.json();
    } catch (err:any) {
        throw new Error(`${err.message}`);
    }
}