import { USER_SERVICE_URL } from "../../../config";

export const changePwdById = async (token: any, id: Number, password: string) => {
  try {
    const response = await fetch(`${USER_SERVICE_URL}/users/password/${id}`, {
      method: 'PUT',
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
