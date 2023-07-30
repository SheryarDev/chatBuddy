import React, { createContext, useState,ReactNode} from "react";



type Conversation={
    _id: string;
    members: string[];
    createdAt: string;
    updatedAt: string;
  }
interface Conversations {
  conversation: Array<Conversation>
  error: string | null;
  loading: boolean;
}

const ConversationContext = createContext<
  [Conversations, React.Dispatch<React.SetStateAction<Conversations>>]
>([
  {

    conversation:[],
    loading: true,
    error: null,
  },
  () => {},
]);

const ConversationProvider = ({ children }:  { children: ReactNode }) => {
  const [Conversation, setConversations] = useState<Conversations>({
    conversation:[],
    loading: true,
    error: null,
  });

  return(
    <ConversationContext.Provider value={[Conversation, setConversations]}>
      {children}
    </ConversationContext.Provider>
  )
};

export { ConversationContext, ConversationProvider };
