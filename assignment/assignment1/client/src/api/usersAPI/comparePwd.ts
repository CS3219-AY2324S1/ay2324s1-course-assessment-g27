import { API_URL } from "../config";

export const comparePwd = async (token: any, id: Number, password: String) => {
  try {
    const response = await fetch(`${API_URL}/auth/password/${id}`, {
        method: 'POST',
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