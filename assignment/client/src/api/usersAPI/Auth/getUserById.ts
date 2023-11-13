import { API_URL } from "../../config";

export async function getUserById(id : Number) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "GET", 
        headers: { "Content-Type": "application/json" },   
    });
    return response.json();
}