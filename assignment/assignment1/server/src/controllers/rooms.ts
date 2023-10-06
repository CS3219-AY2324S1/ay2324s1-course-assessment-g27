import { Request, Response } from "express";
import Room from "../models/Room";

/* CREATE */
/**
 * Creates a new room
 */
export const createRoom = async (req: Request, res: Response) => {
  try {  
    const { question_title, question_difficulty, question_description, question_examples, question_constraints, users } = req.body;
    const newRoom = new Room({
        question_title: question_title,
        question_difficulty: question_difficulty,
        question_description: question_description,
        question_examples: question_examples,
        question_constraints: question_constraints,
        users: users,
    });

    await newRoom.save();

    const room = await Room.findById(newRoom._id);
    res.status(201).json(room);
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
}

/* GET */
export const getRoomDetails = async(req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const roomDetails = await Room.findById(roomId);
    res.json(roomDetails);
  } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
}
// export const getRoomDetails = async(req: Request, res: Response) => {
//   try {
//     const roomId = req.params.id;
//     const roomDetails = await Room.find();
//     res.json(roomDetails);
//   } catch (err: any) {
//       res.status(500).json({ message: err.message });
//     }
// }

/* DELETE */
export const deleteRoom = async(req: Request, res: Response) => {
  try {
    const roomId = req.params.id; 
    
    const deletedRoom = await Room.deleteOne({ _id: roomId });

    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room is not found' });
    }

    res.status(200).json({deletedRoom});
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
}

/* UPDATE */
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const {users} = req.body;

    const updatedRoom = await Room.findByIdAndUpdate( roomId, {users});

    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room is not found' });
    }
    res.json(updatedRoom);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}