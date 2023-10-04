import { API_URL } from "../config";

export const deleteUserById = async (token: any, id: Number) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json(); 
    } else {
      throw new Error(`${response.statusText}`);
    }
  } catch (err:any) {
    throw new Error(`${err.message}`);
  }
};