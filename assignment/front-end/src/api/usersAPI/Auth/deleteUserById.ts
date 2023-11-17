import { USER_SERVICE_URL } from "../../../config";

export const deleteUserById = async (token: any, id: Number) => {
  try {
    const response = await fetch(`${USER_SERVICE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.json()}`);
    }
    
    return await response.json(); 
  } catch (err:any) {
    throw new Error(`${err.message}`);
  }
};