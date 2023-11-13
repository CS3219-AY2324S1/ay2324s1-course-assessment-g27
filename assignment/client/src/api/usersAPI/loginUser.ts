import { API_URL } from "../config";

export async function loginUser(username: String, password: String) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error(`${await response.json()}`)
        }

        return await response.json();
    } catch (err:any) {
        throw new Error(`${err.message}`);
    }
}