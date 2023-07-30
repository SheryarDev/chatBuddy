import React,{useState,useContext,useEffect} from 'react'
import {Box, Grid, Avatar, Typography, Divider,Paper} from "@mui/material"
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
           {/* <Box sx={{maxHeight:"450px",overflowY:"auto",p:1,height:"100%"}} >
           {users.map((user)=>(
           <Grid  container  sx={{display:"flex",alignItems:"center",border:"1px solid lightgray" ,width:"100%",p:1.5,my:1,borderRadius:"12px"}}>
                   <Grid item xs={3}><Avatar/></Grid>
                   <Grid item xs={9}><Typography>{user.name}</Typography></Grid>
                </Grid>))}
           </Box> */}

                 <Box sx={{maxHeight:"430px",overflowY:"auto",p:1,height:"100%"}} >
           {conversation.map((con)=>(
                       <Conversation conversation={con}  currentUser={currentUser}/>
                ))}
           </Box>

        </Paper>

    </Box>
  )
}

export default ChatOnlineUser