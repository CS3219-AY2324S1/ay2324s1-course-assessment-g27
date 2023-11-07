import { initQueues, sendMessage } from "./queue";
import { io } from "..";
import { Channel } from "amqplib";

export const initSocketMatch = async () => {
    const rmqChannel = await initQueues();

    io.on("connection", (socket) => {
        console.log(`User ${socket.id} Connected`);

        socket.on("find_match", 
            (args: {username:string, difficulty:string, language:string, token:any}) => findMatch(rmqChannel, args, socket.id));


        socket.on("disconnect", () => {
            console.log(`User Disconnected`, socket.id);
        })
    });
}

/* Handle Matching queue */
const findMatch = async (rmqChannel:Channel, 
    args:{username: string, difficulty: string, language:string, token:any}, socketId:any) => {
        try {
            const data = { socketId: socketId, ...args};
            sendMessage(rmqChannel, data);
        } catch (err) {
            console.log(err);
        }
}

export const getSocket = (socketId:any)  => {
    return io.sockets.sockets.get(socketId);
}
