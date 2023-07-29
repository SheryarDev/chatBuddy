import axios from "axios"

export const fetchConversationsMessagesApi = async (conversationId:string) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/messages/fetch-messages/${conversationId}`)
        return response
    } catch (error) {
        console.log(error)
    }
}

type Message={
    conversationId:string,
    sender:string,
    text:string
   }

export const AddNewMessagesApi = async (message:Message) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/messages/add-message`,message)
        return response
    } catch (error) {
        console.log(error)
    }
}