import React, { createContext, useState,ReactNode} from "react";

type Message={
 conversationId:string,
 sender:string,
 text:string,
 createdAt:Date | string,

}
interface Messages {
  data: {
    messages: Array<Message>;
  } ;
  conversationId:string
  FriendName:string,
  error: string | null;
  loading: boolean;
}

const MessagesContext = createContext<
  [Messages, React.Dispatch<React.SetStateAction<Messages>>]
>([
  {
    data: {messages:[{conversationId:"",sender:"",text:"",createdAt:""}]},
    conversationId:"",
    FriendName:'',
    loading: true,
    error: null,
  },
  () => {},
]);

const MessagesProvider = ({ children }:  { children: ReactNode }) => {
  const [messages, setMessagess] = useState<Messages>({
    data: {messages:[{conversationId:"",sender:"",text:"",createdAt:""}]},
    conversationId:"",
    FriendName:"",
    loading: true,
    error: null,
  });

  return(
    <MessagesContext.Provider value={[messages, setMessagess]}>
      {children}
    </MessagesContext.Provider>
  )
};

export { MessagesContext, MessagesProvider };
