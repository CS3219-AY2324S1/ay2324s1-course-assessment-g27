import { USER_SERVICE_REGISTER_URL } from "../../config";

export async function registerUser(username: string, password: string, confirmPassword: string) {
    try {
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match!");
        }
        
        const response = await fetch(`${USER_SERVICE_REGISTER_URL}`, {
            method: 'POST',
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
        return await response.json();
    } catch (err:any) {
        throw new Error(`${err.message}`);
    }
}
