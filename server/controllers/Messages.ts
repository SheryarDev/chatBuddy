//64c3a05459324a90edbfc000 //AbdullahId
//64c39f6cdcbe6b463370c694 //Daniyal Id
//64be29ed2fb69e75af0b4cca //Sheryar Id
//64c3a0f159324a90edbfc006 //hamza Id

import Message from "../models/Message";


export const addMessage = async (req: any, res: any) => {
    const newMessage = new Message(req.body)
    try {
        const saveMessage = await newMessage.save();
        res.status(200).json(saveMessage)
    } catch (error) {
        res.status(500).json(error)
    }

}

export const fetchMessages = async (req: any, res: any) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)
    }
}