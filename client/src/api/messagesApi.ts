import axios from "axios"

export const fetchConversationsMessagesApi = async (conversationId:string) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/messages/fetch-messages/${conversationId}`)
        return response
    } catch (error) {
        console.log(error)
    }
}