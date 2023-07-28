import React, {useContext } from "react";
import {
  Box,
  TextField,
  Grid,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { MessagesContext } from "../../context/MessagesContext";
import { UserContext } from "../../context/auth";


const Chat = () => {
  const [messages] = useContext(MessagesContext);
  const [user]=useContext(UserContext)
  console.log("conversatin contect", messages);

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
      <Box sx={{ height: "340px", px: 2, overflowY: "auto" }}>
        {messages?.data?.messages?.length>0 ? messages?.data?.messages?.map((item:any) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              alignItems: item.sender === user?.data?.id ? "flex-end" : "",
            }}
          >
            <Box sx={{ display: "flex" }} component="div" key={item.id}>
              <Avatar sx={{ mr: 2, height: "50px", width: "50px" }} />
              <Typography
                sx={{
                  background: item.sender === user?.data?.id  ? "lightgray" : "blue",
                  color: item.sender === user?.data?.id  ? "black" : "#fff",
                  py: 1,
                  px: 3,
                  borderRadius: 8,
                  fontSize: "14px",
                  maxWidth: "300px",
                }}
              >
                {item.text}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "12px", color: "gray" }}>
              1 hour ago
            </Typography>
          </Box>
        )):<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}><Typography variant="h5" sx={{color:"lightgray"}}>Plz Select Conversation</Typography></Box>}
      </Box>
      <Box sx={{ height: "149px" }}>
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
