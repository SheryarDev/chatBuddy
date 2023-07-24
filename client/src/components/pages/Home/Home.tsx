import React, { useContext } from 'react'
import Header from '../../Header/Header'
import {Box,Grid} from "@mui/material"
import ChatSidebar from '../../ChatSidebar/ChatSidebar'
import Chat from '../../Chat/Chat'
import ChatOnlineUser from '../../chatOnlineUser/ChatOnlineUser'
import { UserContext } from '../../../context/auth'
const Home = () => {
  const [user]=useContext(UserContext)
  console.log("user",user)
  return (
    <Box>
       <Header/>
       <Grid container>
           <Grid item xs={3}>
             <ChatSidebar/>
           </Grid>
           <Grid item xs={6}>
             <Chat/>
           </Grid>
           <Grid item xs={3}>
           <ChatOnlineUser/>
           </Grid>
       </Grid>
    </Box>
  )
}

export default Home