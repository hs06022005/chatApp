import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
{
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    text:{
        type:String,
        default:""
    },

    seen:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        default:null
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    audio:{
        type:String,
        default:null
    }
},
{
    timestamps:true
});

const Message = mongoose.model("Message",messageSchema);

export default Message;