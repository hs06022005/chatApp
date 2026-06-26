import UserModel from "../model/user.schema.js";
const users = new Map();

const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(
            "Connected:",
            socket.id
        );

        socket.on("registerUser",(userId) => {
                users.set(
                    userId,
                    socket.id
                );
                socket.userId = userId;
                io.emit(
                    "onlineUsers",
                    Array.from(users.keys())
                );
        });

        socket.on("typing",({ receiverId, senderName }) => {
            const receiverSocketId =users.get(receiverId);

            if(receiverSocketId)
            {
                io.to(receiverSocketId).emit("userTyping", senderName);
            }
        });
        socket.on("stopTyping",(receiverId)=>{
            const receiverSocketId =users.get(receiverId);

            if(receiverSocketId){
                io.to(receiverSocketId).emit("userStoppedTyping");
            }
        });

        socket.on("sendMessage",(data) => {
            const receiverSocketId =users.get(data.receiverId);

            if(receiverSocketId)
            {
                io.to(receiverSocketId).emit("receiveMessage",data);
            }
        });

        socket.on("messageSeen",({ messageId, senderId }) => {
            const senderSocketId = users.get(senderId);

            if (senderSocketId) {

                io.to(senderSocketId).emit("messageSeenUpdate",messageId);
            }
        });

        socket.on("sendImage",(data)=>{
            const receiverSocketId =
            users.get(data.receiverId);

            if(receiverSocketId){
                io.to(receiverSocketId).emit(
                    "receiveImage",
                    data
                );
            }
        });

        socket.on("joinGroup",(groupId)=>{
                socket.join(groupId);
            }
        );

        socket.on("sendGroupMessage",(data) => {
                const { groupId } = data;

                io.to(groupId).emit(
                    "receiveGroupMessage",
                    data
                );

            }
        );

        socket.on("deleteMessage",(data)=>{
            const receiverSocketId =
            users.get(data.receiverId);

                if(receiverSocketId){
                    io.to(receiverSocketId).emit(
                        "messageDeleted",
                        data.messageId
                    );
                }
            });

            socket.on("editMessage",(data)=>{
                const receiverSocketId =
                users.get(data.receiverId);
                if(receiverSocketId){
                    io.to(receiverSocketId).emit(
                        "messageEdited",
                        data
                    );
                }
            }
        );

        socket.on("sendVoice",(data)=>{
            const receiverSocketId =users.get(
                    data.receiverId
                );
            if(receiverSocketId){
                io.to(receiverSocketId).emit(
                        "receiveVoice",
                        data
                    );
                }
            }
        );

        socket.on("disconnect", async() => {
            for(const [userId,socketId]of users)
            {
                if(socketId === socket.id)
                {
                    await UserModel.findByIdAndUpdate(userId,
                    {
                        lastSeen: new Date()
                    });
                    users.delete(userId);
                    break;
                }
            }
            io.emit("onlineUsers",Array.from(users.keys()));
        });
    })
}

export default setupSocket;