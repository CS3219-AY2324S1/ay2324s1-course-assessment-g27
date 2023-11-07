import { USER_SERVICE_URL } from "../../../config";

export async function getUserById(token : any, id : Number) {
    const response = await fetch(`${USER_SERVICE_URL}/users/${id}`, {
        method: "GET",
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },      
    });
    return response.json();
}