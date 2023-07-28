import React, { createContext, useState,ReactNode} from "react";

type Message={
 ConversationId:string,
 sender:string,
 text:string

}
interface Messages {
  data: {
    messages: Array<Message>;
  } | null;
  error: string | null;
  loading: boolean;
}

const MessagesContext = createContext<
  [Messages, React.Dispatch<React.SetStateAction<Messages>>]
>([
  {
    data: null,
    loading: true,
    error: null,
  },
  () => {},
]);

const MessagesProvider = ({ children }:  { children: ReactNode }) => {
  const [messages, setMessagess] = useState<Messages>({
    data: null,
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
