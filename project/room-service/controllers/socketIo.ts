import { io } from "..";

let roomids:string[] = [];

export const initSocketMatch = async () => {

    io.on("connection", (socket) => {
        console.log(`User ${socket.id} Connected`);
        console.log(roomids);

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

export const getSocket = (socketId:any)  => {
    return io.sockets.sockets.get(socketId);
}
