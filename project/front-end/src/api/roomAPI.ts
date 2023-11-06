import { Room } from "../state/room";
import { ROOM_SERVICE_URL } from "../config";

export async function createRoom(newData: Partial<Room>, token : any) {
    const response = await fetch(`${ROOM_SERVICE_URL}/rooms`, {
        method: "POST",
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newData),
    });
    return response.json();
}


export async function updateRoom(roomId:any, username: any, token: any) {
  try {
    const response = await fetch(`${ROOM_SERVICE_URL}/rooms/${roomId}?newUser=${username}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    

    if (response.ok) {
      return await response.json(); 
    } else {
      throw new Error(`Error updating room: ${response.statusText}`);
    }
  } catch (err:any) {
    throw new Error(`Error updating room: ${err.message}`);
  }
}

export async function getRoomDetails(roomId: any, token: any) {
    const response = await fetch(`${ROOM_SERVICE_URL}/rooms/${roomId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
    })
    return response.json();
}


export const deleteRoom = async (roomId:any, token:any) => {
    try {
      const response = await fetch(`${ROOM_SERVICE_URL}/rooms/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        return roomId; // Deletion successful
      } else {
        const errorMessage = `Error deleting room: ${response.statusText}`;
        throw new Error(errorMessage);
      }
    } catch (err:any) {
      throw new Error(`Error deleting room: ${err.message}`);
    }
  };