import React,{useState,useContext,useEffect} from 'react'
import {Box,Typography, Divider,Paper} from "@mui/material"
import { fetchConversations } from '../../api/conversatonApi'
import { UserContext } from '../../context/auth'
import Conversation from '../Conversation/Conversation'


interface Conversations{
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}
const ChatOnlineUser = () => {
  const [conversation,setConversations]=useState<Conversations[]>([])
  const [user]=useContext(UserContext)
  const currentUser:string=user?.data?.id;

  const handleFetchConversations=async()=>{
    console.log("id",currentUser)
   const res=await fetchConversations(currentUser)
   setConversations(res?.data)
   console.log(res)
  }
  console.log("conversations",conversation)

  useEffect(()=>{
   handleFetchConversations();

  },[currentUser])
  return (
    <Box sx={{border:"1px solid lightgray",borderColor:"secondary.main",height:"95%",minHeight:"560px",px:2,py:2}}>
        <Paper  sx={{height:"100%",border:"1px solid lightgray",borderColor:"secondary.main",p:2,mt:2,borderRadius:"12px",maxHeight:"500px"}}>
        <Typography  sx={{mb:0.2,display:"block",color:"primary.main",fontSize:"22px",fontWeight:600}}>Chats</Typography>
        <Divider/>

                 <Box sx={{maxHeight:"430px",overflowY:"auto",p:1,height:"100%"}} >
           {conversation?.length >0 ? conversation.map((con)=>(
                       <Conversation conversation={con}  currentUser={currentUser} />
                )) :<Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>No Chats Found!</Box>}
           </Box>

        </Paper>

    </Box>
  )
}

export default ChatOnlineUser