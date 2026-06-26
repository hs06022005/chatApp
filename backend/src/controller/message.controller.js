import Message from "../model/message.js";
import cloudinary from "../config/cloudinary.js";
import Chat from "../model/chat.js";


const sendMessage = async (req,res)=>{
    try{
        const {sender,receiver,text} = req.body;
        const message = await Message.create({sender,receiver,text });

        let chat = await Chat.findOne({participants: 
            {
                $all: [sender, receiver]
            }
        });
        const receiver =await UserModel.findById(receiver);

        if(
            receiver.blockedUsers.includes(
            sender
        )
        ){
        return res.status(403).json({
            message:
            "You are blocked"
        });
        }

        if (!chat) {
            chat = await Chat.create({
                participants: [sender,receiver],
                lastMessage: message._id
            });
        }
        else {
            chat.lastMessage = message._id;
            await chat.save();

        }
        res.status(201).json(message);

    }
    catch(error){
        res.status(500).json({ error:error.message});
    }
};

const getMessages = async (req,res)=>{
    try{
        const {senderId,receiverId} = req.params;
        const messages =await Message.find({
            $or:[
                {
                    sender:senderId,
                    receiver:receiverId
                },
                {
                    sender:receiverId,
                    receiver:senderId
                }
            ]

        })
        .sort({createdAt:1});

        res.status(200).json(messages);

    }
    catch(error){   
        res.status(500).json({error:error.message});
    }
};
const markAsSeen = async (req, res) => {

    try {
        const { messageId } = req.params;

        const message =await Message.findByIdAndUpdate(
            messageId,
            {
                seen: true
            },
            {
                new: true
            });
        res.status(200).json(message);

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const sendImage = async (req,res)=>{
    try{
        const { sender, receiver} = req.body;
        const result = await cloudinary.uploader.upload(
            req.file.path
        );

        const message = await Message.create({
            sender,
            receiver,
            image:result.secure_url

        });

        res.status(201).json(
            message
        );

    }catch(error){
        res.status(500).json({ error:error.message});
    }
};
const deleteMessage = async (req,res)=>{
    try{
        const { messageId } = req.params;
        const message =await Message.findByIdAndUpdate(messageId,
            {
                isDeleted:true
            },
            {
                new:true
            }
        );
        res.status(200).json(message);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const editMessage = async (req,res)=>{
    try{
        const {messageId} = req.params;
        const { text} = req.body;
        const message =
        await Message.findByIdAndUpdate(
            messageId,
            {
                text
            },
            {
                new:true
            }
        );

        res.status(200).json(message);

    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const sendVoice = async (req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                resource_type:"video"
            }
        );

        const message =await Message.create({
            sender:req.body.sender,
            receiver:req.body.receiver,

            audio:
            result.secure_url

        });
        res.status(201).json(message);

    }catch(error){
        res.status(500).json({error:error.message});
    }
};
export default {
    sendMessage,
    getMessages,
    markAsSeen,
    sendImage,
    deleteMessage,
    editMessage,
    sendVoice
};