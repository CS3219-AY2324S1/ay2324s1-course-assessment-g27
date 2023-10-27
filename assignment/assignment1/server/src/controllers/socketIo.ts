import { initQueues, sendMessage } from "./queue";
import { io } from "..";
import { Channel } from "amqplib";

let roomids:string[] = [];

export const initSocketMatch = async () => {
    const rmqChannel = await initQueues();

    io.on("connection", (socket) => {
        console.log(`User ${socket.id} Connected`);
        console.log(roomids);

        socket.on('send_message', (roomid, message) => {
            socket.to(roomid).emit('chat_message', message);
        })

        socket.on("find_match", 
            (args: {username:string, difficulty:string, token:any}) => findMatch(rmqChannel, args, socket.id));

        socket.on("join_room", async (roomid) => {
            socket.join(roomid);
            console.log(`${socket.id} joined ${roomid}`);
        })

        socket.on("leaving_room", (roomid) => {
            socket.to(roomid).emit("leave_room_request");
        })

        socket.on("leave_room", async (roomid) => {
            socket.leave(roomid);
            console.log(`${socket.id} left ${roomid}`);
        })

        socket.on("code_change", ( {roomId, code} ) => {
            socket.to(roomId).emit("code_change", code);
        });

        socket.on("disconnecting", () => {
            socket.to((Array.from(socket.rooms)[1])).emit("leave_room_request");
        })

        socket.on("disconnect", () => {
            console.log(`User Disconnected`, socket.id);
        })
    });
}

/* Handle Matching queue */
const findMatch = async (rmqChannel:Channel, args:{username: string, difficulty: string, token:any}, socketId:any) => {
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