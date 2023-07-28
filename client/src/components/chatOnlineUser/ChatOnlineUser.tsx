import React,{useState,useContext,useEffect} from 'react'
import {Box, Grid, Avatar, Typography, Divider} from "@mui/material"
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
  const users=[{name:"sheryar"},{name:"Daniyal"},{name:"saad"},{name:"zahid"},{name:"hamza"},{name:"hamza"},{name:"hamza"},{name:"hamza"}]

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
    <Box sx={{border:"1px solid lightgray",height:"95%",minHeight:"560px",px:2,py:2}}>
        <Box sx={{height:"100%",border:"1px solid lightgray",p:2,mt:2,borderRadius:"12px",maxHeight:"500px"}}>
        <Typography sx={{mb:0.2,display:"block",color:"green"}}>Online</Typography>
        <Divider/>
           {/* <Box sx={{maxHeight:"450px",overflowY:"auto",p:1,height:"100%"}} >
           {users.map((user)=>(
           <Grid  container  sx={{display:"flex",alignItems:"center",border:"1px solid lightgray" ,width:"100%",p:1.5,my:1,borderRadius:"12px"}}>
                   <Grid item xs={3}><Avatar/></Grid>
                   <Grid item xs={9}><Typography>{user.name}</Typography></Grid>
                </Grid>))}
           </Box> */}

                 <Box sx={{maxHeight:"450px",overflowY:"auto",p:1,height:"100%"}} >
           {conversation.map((con)=>(
                       <Conversation conversation={con}  currentUser={currentUser}/>
                ))}
           </Box>

        </Box>

    </Box>
  )
}

export default ChatOnlineUser