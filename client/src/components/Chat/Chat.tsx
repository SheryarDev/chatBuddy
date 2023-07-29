import React, {useContext, useState,useRef,useEffect } from "react";
import js_ago from "js-ago";
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
import { AddNewMessagesApi } from "../../api/messagesApi";
import {  io,Socket} from "socket.io-client";


type Message={
  conversationId:string,
  sender:string,
  text:string,
  createdAt:Date |string

 }
 type socketData={
  senderId:string,
  text:string,
  createdAt:Date,
 }

 type socketUser={
  userId:"",
  socketId:""
 }
 type arrivalMessage={
  conversationId:string
  sender:string,
  text:string,
  createdAt:Date | string

 }
const Chat = () => {
  const [messages,setMessages] = useContext(MessagesContext);
  const [newMessage,setNewMessage]=useState("")
  const [user]=useContext(UserContext)
const [arrivalMessage,setArrivalMessage]=useState<arrivalMessage | null>(null)

  const socket=useRef<Socket>()

  const scrollRef = useRef<HTMLElement | null>(null);
  console.log("all context messages", messages);


  useEffect(()=>{
    if(user?.data?.id){
      socket.current?.emit("addUser",user?.data?.id)
      socket.current?.on("getUsers",(users:Array<socketUser>)=>{
        console.log("socket users",users)
      })
    }
  },[user?.data?.id])


  useEffect(()=>{
   socket.current=io("ws://localhost:8900")
   console.log("sheryar data")
   socket.current?.on("getMessage",(data:socketData)=>{
    console.log("data",data)
   setArrivalMessage({
    sender:data.senderId,
    text:data.text,
    createdAt:Date.now(),
    conversationId:messages?.data?.messages[0]?.conversationId
   })
   })
  },[])
console.log("arraival Message",arrivalMessage)
const reslut=messages.data?.messages?.map((m) =>m.sender).includes("64c39f6cdcbe6b463370c694")
console.log("result",reslut)

useEffect(()=>{
  (arrivalMessage && messages.data?.messages?.map((m) =>m.sender).includes(arrivalMessage.sender)) &&
  setMessages(prevState => {
    return {
      ...prevState,
      data: {
        ...prevState.data,
        messages: [...prevState.data.messages, arrivalMessage],
      },
    };
  });
},[arrivalMessage])

  console.log("scoket",socket)

  // const receiverId=messages?.data?.messages?.find((member)=>member.sender !==user?.data?.id)
  const receiver = messages?.data?.messages?.filter((message) => message.sender !== user?.data?.id);

const receiverId = receiver.map((message) => message.sender);
  console.log("reciverId",receiverId[0])
const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
   e.preventDefault();
   const message={
    sender:user?.data?.id,
    text:newMessage,
    conversationId:messages?.data?.messages[0]?.conversationId
   }

   socket.current?.emit("sendMessage",{
    senderId:user?.data?.id,
    receiverId:receiverId[0],
    text:newMessage
   })

   try {
       const res=await AddNewMessagesApi(message);
      //  setMessages({...messages,data:{messages:[...messages,res?.data]}})
      setMessages(prevState => {
        return {
          ...prevState,
          data: {
            ...prevState.data,
            messages: [...prevState.data.messages, res?.data],
          },
        };
      });
       console.log(res)
   } catch (error) {
         console.log(error)
   }
}

useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
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

        {messages?.data?.messages?.length >0 ? messages?.data?.messages?.map((item:Message) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              alignItems: item.sender === user?.data?.id ? "flex-end" : "",
            }}
            ref={scrollRef}
          >
            <Box sx={{ display: "flex" }} component="div" key={item?.conversationId}>
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
              {item?.createdAt ? js_ago(new Date(item?.createdAt)) : ""}
            </Typography>
          </Box>
        )):<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}><Typography variant="h5" sx={{color:"lightgray"}}>Plz Select Conversation</Typography></Box>}
      </Box>
      <Box sx={{ height: "149px" }}>
        <TextField
          multiline
          rows={3}
          onChange={(e)=>setNewMessage(e.target.value)}
          placeholder="Write you message.."
          fullWidth
          inputProps={{
            style: {
              border: "none",
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Button variant="contained" sx={{ width: "150px" }} onClick={handleSubmit}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
