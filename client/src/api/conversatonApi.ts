import axios from "axios"

export const fetchConversations=(userId:string)=>{
    try {
        const res=axios.get(`http://localhost:8080/api/conversations/fetch-conversation/${userId}`)
       return res;
    } catch (error) {
      console.log(error)
    }

}