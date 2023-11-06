import amqp, { Channel, ConsumeMessage } from "amqplib";
import { getSocket } from "./socketIo";
import { getQuestionList } from "../api/questionApi";
import { createNewRoom } from "../api/roomApi";

const QueuesList = ["Easy", "Medium", "Hard"];
const WaitingQueue = new Map();;

export const initQueues = async () => {
    const rmqConnection = await amqp.connect("amqp://rabbitmq:5672");// rabbitMQ port:5672
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
    const { difficulty, username, language, token, socketId } = incomingUserMatch;
    // If map does not have the key -> Create the map. Key is the difficulties level.
    const newKey = difficulty+"_"+language;
    if (!WaitingQueue.has(newKey)) {
        WaitingQueue.set(newKey, []);
    }

    if(WaitingQueue.get(newKey).length == 1) {
        // When we get 2 Message in the queue, we start get the respective content and their sockets
        const userOneMatch =  JSON.parse(WaitingQueue.get(newKey)[0].content.toString());
        const userOneMatchSocket = getSocket(userOneMatch.socketId);
        const userIncomingMatchSocket = getSocket(socketId);
    
        if (!userOneMatch || !userOneMatchSocket || !userOneMatchSocket.connected
            || userOneMatch.username == username) {
                // Ack the Message and reset the queue
                WaitingQueue.get(newKey).forEach((Message: ConsumeMessage) => {
                    channel.ack(Message);
                });
                WaitingQueue.set(newKey, []);
                WaitingQueue.get(newKey).push(msg);
        } else {
            // Push in the msg into the queue
            WaitingQueue.get(newKey).push(msg);
            // Ack all the messages and reset the queue
            WaitingQueue.get(newKey).forEach((Message: ConsumeMessage) => {
                channel.ack(Message);
            });
            WaitingQueue.set(newKey, []);
            // If none of the socket is null can emit success match after create new room and get the id
            if(userOneMatchSocket && userIncomingMatchSocket) {
                const quesData = await getQuestionList(difficulty, token);
                const roomid = await createNewRoom(userOneMatch.username, username, token, language, quesData);
                userOneMatchSocket.emit("successMatch", roomid);
                userIncomingMatchSocket.emit("successMatch", roomid);
            }
        }
    } else {
        // Push the current cosumeMessage into the queue
        WaitingQueue.get(newKey).push(msg);
    }
}
