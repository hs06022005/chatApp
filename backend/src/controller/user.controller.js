import UserModel from "../model/user.schema.js";

const getAllUsers = async (req, res) => {
    try {

        const users = await UserModel
            .find()
            .select("-password");

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const getUserById = async (req, res) => {
    try {

        const user = await UserModel
            .findById(req.params.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const blockUser = async (req,res)=>{
    try{
        const { blockedUserId} = req.body;

        const user =await UserModel.findByIdAndUpdate(
            req.user.id,
            {
                $addToSet:{
                    blockedUsers:
                    blockedUserId
                }
            },
            {
                new:true
            }
        );
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({ error:error.message });
    }
};

const unblockUser = async (req,res)=>{
    try{
        const { blockedUserId } = req.body;
        const user =await UserModel.findByIdAndUpdate(
            req.user.id,
            {
                $pull:{
                    blockedUsers:
                    blockedUserId
                }
            },

            {
                new:true
            }
        );

        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error:error.message });
    }
};

export default {
    getAllUsers,
    getUserById,
    blockUser,
    unblockUser
};
