import { USER_SERVICE_URL } from "../../../config";

export const comparePwd = async (token: any, id: Number, password: String) => {
  try {
    const response = await fetch(`${USER_SERVICE_URL}/users/password/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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
