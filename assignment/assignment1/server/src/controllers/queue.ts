import amqp, { Channel, ConsumeMessage } from "amqplib";
import { MatchProcess } from "../models/MatchProcess"
import {QuestionModel} from "../models/Question";
import axios from 'axios';
import { API_URL } from "../util/constant";
import { getSocket } from "./socketIo";

const QueuesList = ["Easy", "Medium", "Hard"];
const WaitingQueue = new Map();;

export const initQueues = async () => {
    const rmqConnection = await amqp.connect("amqp://127.0.0.1:5672");// rabbitMQ port:5672
    const consumerChannel = await rmqConnection.createChannel();
    const producerChannel = await rmqConnection.createChannel();

    for (const queue of QueuesList) {
        consumerChannel.assertQueue(queue, {durable: false});
        producerChannel.assertQueue(queue, {durable: false});
        consumerChannel.consume(queue, (message) => {
            if (message) {
              // Call the processAndAckMessage function to handle the message.
              processAndAckMessage(message, consumerChannel);
            }
          } );
    }
    return producerChannel;
}

export const sendMessage = (channel: Channel, data: any ) => {
    // send the respective difficulties queue
    channel.sendToQueue(
        data.difficulty,
        Buffer.from(JSON.stringify(data))
    );
}

const processAndAckMessage = async (msg: ConsumeMessage, channel:Channel) => {
    const incomingUserMatch = JSON.parse(msg.content.toString());
    const { difficulty, username, token, socketId } = incomingUserMatch;
    // If map does not have the key -> Create the map. Key is the difficulties level.
    if (!WaitingQueue.has(difficulty)) {
        WaitingQueue.set(difficulty, []);
    }
    // Push the current cosumeMessage into the queue
    WaitingQueue.get(difficulty).push(msg);

    if(WaitingQueue.get(difficulty).length == 2) {
        // When we get 2 Message in the queue, we start get the respective content and their sockets
        const userOneMatch =  JSON.parse(WaitingQueue.get(difficulty)[0].content.toString());
        const userTwoMatch =  JSON.parse(WaitingQueue.get(difficulty)[1].content.toString());
        const userOneMatchSocket = getSocket(userOneMatch.socketId);
        const userTwoMatchSocket = getSocket(userTwoMatch.socketId);
    
        if (!userOneMatch || !userOneMatchSocket || !userOneMatchSocket.connected || !userTwoMatch
            || !userTwoMatchSocket || !userTwoMatchSocket.connected 
            || userOneMatch.username == userTwoMatch.username) {
                // Ack the Message and reset the queue
                WaitingQueue.get(difficulty).forEach((Message: ConsumeMessage) => {
                    channel.ack(Message);
                });
                WaitingQueue.set(difficulty, []);
        } else {
            // Ack the Message and reset the queue
            WaitingQueue.get(difficulty).forEach((Message: ConsumeMessage) => {
                channel.ack(Message);
            });
            WaitingQueue.set(difficulty, []);
            // If none of the socket is null can emit success match after create new room and get the id
            if(userOneMatchSocket && userTwoMatchSocket) {
                const quesData = await getQuestionList(difficulty, token);
                const roomid = await createNewRoom(userOneMatch.username, userTwoMatch.username, token, quesData);
                userOneMatchSocket.emit("successMatch", roomid);
                userTwoMatchSocket.emit("successMatch", roomid);
            }
        }
    }
}

const getQuestionList = async (difficulty:string, token:any) => {
    const response = await axios.get(`${API_URL}/questions`, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"} })
    const filteredQuestions = response.data.filter((question: { difficulty: any; }) => question.difficulty === difficulty);
    return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
}

const createNewRoom = async (username1:any, username2:any, token:any, quesdata:QuestionModel) => {
    const newData = {
      question_id: quesdata._id,
      users: [username1, username2],
    };
    const response = await axios.post(`${API_URL}/rooms`, JSON.stringify(newData), {headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json"}})
    return response.data._id;
};