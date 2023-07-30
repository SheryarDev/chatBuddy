import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography, Avatar } from "@mui/material";
import { FetchUserFromApi } from "../../api/usersApi";
import { MessagesContext } from "../../context/MessagesContext";
import { fetchConversationsMessagesApi } from "../../api/messagesApi";

interface ConversationProps{
    conversation:{
      _id:string,
      members:Array<string>
    },
    currentUser:string
}
interface ConversationUser{
    _id:string,
    name:string,
    email:string,
}
const Conversation = ({ conversation, currentUser }: ConversationProps) => {
  const [conversationUser, setConversationsUser] = useState<ConversationUser>({_id:"",name:"",email:""});
  const [message,setMessages]=useContext(MessagesContext)
//   console.log("conversation user",conversationUser)
// console.log("message context",message)
  console.log("conversation", conversation);
//   console.log("uer", currentUser);
  const fetchConversationsUser = async (userId: string) => {
    const res = await FetchUserFromApi(userId);
    setConversationsUser(res?.data);
  };


  const handleConversationsMessages = async () => {
    console.log("message conversation id",conversation?._id)

    const response = await fetchConversationsMessagesApi(conversation?._id);
     setMessages({...message,data:{messages:response?.data},conversationId:conversation?._id,FriendName:conversationUser?.name})
    console.log("conversation messsages response", response);

  };
  useEffect(() => {
    const friendId: string = conversation?.members?.find(
      (m: string) => m !== currentUser
    ) ?? '';
    fetchConversationsUser(friendId);
  }, []);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid lightgray",
        borderColor:"secondary.main",
        width: "100%",
        p: 1.5,
        my: 1,
        borderRadius: "12px",
        cursor:"pointer",
        transition: 'background-color 0.2s ease',
        ":hover":{
        backgroundColor:"primary.main"
        }
      }}
      onClick={() => handleConversationsMessages()}
    >
      <Grid item xs={3}>
        <Avatar />
      </Grid>
      <Grid item xs={9}>
        <Typography>{conversationUser?.name}</Typography>
      </Grid>
    </Grid>
  );
};

export default Conversation;
