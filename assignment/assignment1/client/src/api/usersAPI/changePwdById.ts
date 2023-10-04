import { API_URL } from "../config";

export const changePwdById = async (token: any, id: Number, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/password/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        password,
      }),
    });

    if (response.ok) {
      return await response.json(); 
    } else {
      throw new Error(`Error updating password: ${response.statusText}`);
    }
  } catch (err:any) {
    throw new Error(`Error updating password: ${err.message}`);
  }
};