import React from 'react'
import {Box, Grid, TextField,Avatar, Typography} from "@mui/material"

const ChatSidebar = () => {
  const user=[{name:"sheryar"},{name:"Daniyal"},{name:"saad"},{name:"zahid"},{name:"hamza"},{name:"hamza"},{name:"hamza"},{name:"hamza"}]
  return (
    <Box sx={{borderRight:"1px solid lightgray",height:"100%",minHeight:"500px",px:2,py:2}}>
        <Box>
          <TextField placeholder='Search Your Buddy' fullWidth/>
        </Box>
        <Box>
           <Box sx={{height:"100%",border:"1px solid lightgray",p:2,mt:2,borderRadius:"12px",maxHeight:"450px",overflowY:"auto"}} >
           {user.map((user)=>(
           <Grid  container  sx={{display:"flex",alignItems:"center",border:"1px solid lightgray" ,width:"100%",p:1.5,my:1,borderRadius:"12px"}}>
                   <Grid item xs={3}><Avatar/></Grid>
                   <Grid item xs={9}><Typography>{user.name}</Typography></Grid>
                </Grid>))}
           </Box>
        </Box>

    </Box>
  )
}

export default ChatSidebar