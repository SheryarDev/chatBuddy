import React,{useState} from "react";
import {
  Box,
  TextField,
  Grid,
  Avatar,
  Typography,
  Button,
} from "@mui/material";

const Chat = () => {
  const [ownMessage,setOwnMessage]=useState(true)
  const messages=[{id:1,message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores possimus tempore?"},{id:2,message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores possimus tempore?"},{id:3,message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores possimus tempore?"},{id:4,message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores possimus tempore?"},{id:5,message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores possimus tempore?"},{id:6,message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores possimus tempore?"},{id:7,message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores possimus tempo,re?"},{id:8,message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores possimus tempore?"},{id:9,message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores possimus tempore?"}]
  return (
    <Box sx={{ height: "100%" }}>
      <Box>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid lightgray",
            width: "100%",
            p: 1.5,
          }}
        >
          <Grid item xs={1}>
            <Avatar sx={{ width: "50px", height: "50px" }} />
          </Grid>
          <Grid item xs={11}>
            <Typography>Sheryar</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "340px", px:2,overflowY:"auto" }}>
    {messages.map((item)=>(
    <Box sx={{display:"flex",flexDirection:"column",mt:2,alignItems:ownMessage ? "flex-end" :""}}>
          <Box sx={{display:"flex"}} component="div" key={item.id}>
           <Avatar sx={{mr:2,height:"50px",width:"50px"}}/>
           <Typography sx={{background:ownMessage  ? "lightgray":"blue",color:ownMessage ?"black" :"#fff",py:1,px:3,borderRadius:8,fontSize:"14px",maxWidth:"300px"}}>{item.message}</Typography>
           </Box>
           <Typography sx={{fontSize:"12px",color:"gray"}}>1 hour ago</Typography>
        </Box>))}
      </Box>
      <Box sx={{ height: "149px", }}>
        <TextField
          multiline
          rows={3}
          placeholder="Write you message.."
          fullWidth
          inputProps={{
            style: {
              border: "none",
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Button variant="contained" sx={{ width: "150px" }}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
