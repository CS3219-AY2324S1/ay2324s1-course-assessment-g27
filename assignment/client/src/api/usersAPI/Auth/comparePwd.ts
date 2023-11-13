import { API_URL } from "../../config";

export const comparePwd = async (id: Number, password: String) => {
  try {
    const response = await fetch(`${API_URL}/auth/password/${id}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
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