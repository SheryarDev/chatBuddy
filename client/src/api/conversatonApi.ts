import axios from "axios"

export const fetchConversations=(userId:string)=>{
    try {
        const res=axios.get(`http://localhost:8080/api/conversations/fetch-conversation/${userId}`)
       return res;
    } catch (error) {
      console.log(error)
    }

}

interface NewConversationPrams{
  senderId:string
  receiverId:string

}

export const AddNewConversationApi=({senderId,receiverId}:NewConversationPrams)=>{
  try {
      const res=axios.post(`http://localhost:8080/api/conversations/new-conversation`,{senderId,receiverId})
     return res;
  } catch (error) {
    console.log(error)
  }

}