import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography, Avatar } from "@mui/material";
import { FetchUserFromApi } from "../../api/usersApi";
import { MessagesContext } from "../../context/MessagesContext";
import { fetchConversationsMessagesApi } from "../../api/messagesApi";

// interface ConversationProps{
//     conversation:{

//     },
//     currentUser:string
// }
interface ConversationUser{
    _id:string,
    name:string,
    email:string,
}
const Conversation = ({ conversation, currentUser }: any) => {
  const [conversationUser, setConversationsUser] = useState<ConversationUser>({_id:"",name:"",email:""});
  const [message,setMessages]=useContext(MessagesContext)
  console.log("conversation user",conversationUser)
console.log("message context",message)
  console.log("conversation", conversation);
  console.log("uer", currentUser);
  const fetchConversationsUser = async (userId: string) => {
    const res = await FetchUserFromApi(userId);
    setConversationsUser(res?.data);
  };


  const handleConversationsMessages = async () => {
    const response = await fetchConversationsMessagesApi(conversation?._id);
     setMessages({...message,data:{messages:response?.data}})
    console.log("response", response);
  };
  useEffect(() => {
    const friendId = conversation?.members?.find(
      (m: string) => m !== currentUser
    );
    fetchConversationsUser(friendId);
  }, []);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid lightgray",
        width: "100%",
        p: 1.5,
        my: 1,
        borderRadius: "12px",
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