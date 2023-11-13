import { API_URL } from "../../config";

export const editUserById = async (id: Number, username: String) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        id
      }),
    });

    if (!response.ok) {
      throw new Error(`${await response.json()}`); 
    } 

    return await response.json();
  } catch (err:any) {
    throw new Error(`${err.message}`);
  }
};