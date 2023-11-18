import axios from 'axios';
import { ROOM_API_URL } from "../util/constant";
import {QuestionModel} from "../models/Question";

export const createNewRoom = async (username1:any, username2:any, token:any, language:string, quesdata:QuestionModel) => {
    const newData = {
      question_id: quesdata._id,
      language:language,
      users: [username1, username2],
    };
    const response = await axios.post(`${ROOM_API_URL}/rooms`, JSON.stringify(newData), {headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json"}})
    return response.data._id;
};
