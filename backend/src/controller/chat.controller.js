import Chat from "../model/chat.js";

const getChats = async (req, res) => {

    try {
        const userId =req.user.id;
        const chats =await Chat.find({
                participants: userId
            })
            .populate(
                "participants",
                "-password"
            )
            .populate(
                "lastMessage"
            );
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
const createGroup = async (req, res) => {

    try {
        const {groupName,participants} = req.body;
        const groupAdmin = req.user.id;
        const group = await Chat.create({groupName,participants,
                                        isGroup: true,groupAdmin});
        res.status(201).json(group);

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const addMember = async (req,res)=>{
    try{
        const {groupId,memberId} = req.body;
        const group =await Chat.findByIdAndUpdate(
            groupId,
            {
                $addToSet:{
                    participants:
                    memberId
                }
            },
            {
                new:true
            }
        );
        res.status(200).json(group);
    }catch(error){
        res.status(500).json({ error:error.message });
    }
};

const removeMember = async (req,res)=>{
    try{
        const { groupId, memberId } = req.body;
        const group = await Chat.findByIdAndUpdate(
            groupId,
            {
                $pull:{
                    participants:
                    memberId
                }
            },
            {
                new:true
            }
        );
        res.status(200).json(group);
    }catch(error){

        res.status(500).json({ error:error.message });
    }
};
const leaveGroup = async (req,res)=>{
    try{
        const { groupId } = req.body;
        const group = await Chat.findByIdAndUpdate(
            groupId,
            {
                $pull:{
                    participants:
                    req.user.id
                }
            },
            {
                new:true
            }
        );
        res.status(200).json(group);
    }catch(error){
        res.status(500).json({ error:error.message });
    }
};
const deleteGroup = async (req,res)=>{
    try{
        const { groupId } = req.params;
        const group = await Chat.findById(groupId);
        if (!group.groupAdmin.equals(req.user.id)) {
            return res.status(403).json({
                message: "Only admin can delete group"
            });
        }

        await Chat.findByIdAndDelete(groupId);
    }catch(error){
        res.status(500).json({ error:error.message });
    }
};
const transferAdmin = async (req,res)=>{
    try{
        const { groupId, newAdminId } = req.body;
        const group =await Chat.findByIdAndUpdate(
            groupId,
            {
                groupAdmin:
                newAdminId
            },
            {
                new:true
            }
        );
        res.status(200).json(group);
    }catch(error){
        res.status(500).json({ error:error.message });

    }
};
export default {
    getChats,
    createGroup,
    addMember,
    removeMember,
    leaveGroup,
    deleteGroup,
    transferAdmin
};