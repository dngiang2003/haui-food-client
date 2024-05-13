import { CircularProgress, Divider, Typography } from '@mui/material';
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
import { useChatContext } from '../../context/ChatContext';

const Conversations = () => {

  const { conversations } = useChatContext();
  const { loading } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <div key={idx}>
          <Conversation conversation={conversation} emoji={getRandomEmoji()} lastIdx={idx === conversations.length - 1} />
          {idx !== conversations.length - 1 && <Divider />}
        </div>
      ))}
      {loading &&
        <div className="flex justify-center mt-2">
          <CircularProgress size={24} />
          <Typography variant="body2" className="ml-2">Loading...</Typography>
        </div>
      }
    </div>
  );
};

export default Conversations;
