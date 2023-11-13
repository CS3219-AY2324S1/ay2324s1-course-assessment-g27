import { API_URL } from "../../config";

export const deleteUserById = async (id: Number) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`${response.json()}`);
    }
    
    return await response.json(); 
  } catch (err:any) {
    throw new Error(`${err.message}`);
  }
};