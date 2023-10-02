import { API_URL } from "../config";

export const editUserById = async (token: any, id: Number, username: String) => {
  try {
    //const body = JSON.parse(`{"username": "${username}"}`);
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        username
      }),
    });

    if (response.ok) {
      return await response.json(); 
    } else {
      throw new Error(`Error editing user: ${response.statusText}`);
    }
  } catch (err:any) {
    throw new Error(`Error editing user: ${err.message}`);
  }
};