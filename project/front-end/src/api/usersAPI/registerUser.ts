import { USER_SERVICE_REGISTER_URL } from "../../config";

export async function registerUser(username: String, password: String, confirmPassword: String) {
    try {
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match!");
        }
        
        const response = await fetch(`${USER_SERVICE_REGISTER_URL}`, {
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
        return await response.json();
    } catch (err:any) {
        throw new Error(`${err.message}`);
    }
}
