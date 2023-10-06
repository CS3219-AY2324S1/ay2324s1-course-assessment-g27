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
        const res = await response.json();
        throw new Error(`${res}`);
      }
    } catch (err:any) {
      throw new Error(`${err.message}`);
    }
};