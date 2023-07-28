import Conversation from "../models/Conversation";


export const NewConversation=async (req:any,res:any)=>{
    const newConversation=new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    })

    try {
         const savedConversation=await newConversation.save();
         res.status(200).json({savedConversation})
    } catch (error) {
       req.status(500).json(error)
    }
}

export const getUserConversations=async(req:any,res:any)=>{
  const userId=req.params.userId;
    try {
        const conversation= await Conversation.find({members:{$in:[userId]}})
        res.status(200).json(conversation)
    } catch (error) {
       res.status(500).json(error)
    }

}