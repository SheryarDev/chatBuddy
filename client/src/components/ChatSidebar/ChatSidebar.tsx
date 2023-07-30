import {useState,useEffect,useContext} from 'react'
import {Box, Grid, TextField,Avatar, Typography,Paper} from "@mui/material"
import { FetchAllUserFromApi } from '../../api/usersApi'
import { UserContext } from '../../context/auth'
import { MessagesContext } from '../../context/MessagesContext'
import { AddNewConversationApi } from '../../api/conversatonApi'
import { fetchConversationsMessagesApi } from '../../api/messagesApi'

interface NewConversationUser{
  _id:string,
  name:string,
  email:string
}
const ChatSidebar = () => {
  const [allUsers,setAllUsers]=useState([])
  const [user,]=useContext(UserContext)
  const [message,setMessages]=useContext(MessagesContext)
  const [newConversation,setNewConversation]=useState([])

  const handleFetchAllUsers=async()=>{
    const res=await FetchAllUserFromApi()
    console.log("res all users",res)
    setAllUsers(res?.data)
  }

  const handleFetchConversationMessages=async()=>{
    const res= await fetchConversationsMessagesApi(message?.conversationId)
    console.log("conversation message",res)
    setMessages({...message,data:{messages:res?.data}})
  }

  useEffect(()=>{
    handleFetchConversationMessages();
  },[newConversation])

  const handleNewConversationApi=async(receiverId:string,receiverName:string)=>{
    const data={
      senderId:user?.data?.id,
      receiverId
    }
    const res=await AddNewConversationApi(data)
    console.log("res new conversation",res?.data?._id)
    setNewConversation(res?.data)
    setMessages({...message,conversationId:res?.data?._id,FriendName:receiverName})
  }

  console.log("new Conversation",newConversation)

  useEffect(()=>{
    handleFetchAllUsers();
  },[])
  return (
    <Box sx={{borderRight:"1px solid #e7e8e9",borderColor:"secondary.main",height:"100%",minHeight:"500px",px:2,py:2}}>
        <Box>
          <TextField placeholder='Search Your Buddy' fullWidth/>
        </Box>
        <Paper sx={{height:"100%",border:"1px solid #e7e8e9",borderColor:"secondary.main",p:2,mt:2,borderRadius:"12px",maxHeight:"450px"}} >
           <Box sx={{maxHeight:"420px",overflowY:"auto",px:1}}>
           {allUsers.filter((u:NewConversationUser)=>u._id !==user?.data?.id).map((user:NewConversationUser)=>(
           <Grid  container  sx={{display:"flex",alignItems:"center",border:"1px solid #e7e8e9",borderColor:"secondary.main" ,width:"100%",p:1.5,my:1,borderRadius:"12px", transition: 'background-color 0.2s ease',
           ":hover":{
           backgroundColor:"primary.main"
           }}} onClick={()=>handleNewConversationApi(user?._id,user?.name)}>
                   <Grid item xs={3}><Avatar/></Grid>
                   <Grid item xs={9}><Typography>{user?.name}</Typography></Grid>
                </Grid>))}
           </Box>
        </Paper>

    </Box>
  )
}

export default ChatSidebar