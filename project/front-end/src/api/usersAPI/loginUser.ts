import { USER_SERVICE_LOGIN_URL } from "../../config";

export async function loginUser(username: String, password: String) {
    try {
        const response = await fetch(`${USER_SERVICE_LOGIN_URL}`, {
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