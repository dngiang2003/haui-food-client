import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useAuthContext } from "../../context/AuthContext";
import { Avatar, Typography } from "@mui/material";
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    }
  }, [setSelectedConversation]);

  return (
    <div style={{ width: "70%" }}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2" style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" component="span" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              <Avatar className="avatar" src={selectedConversation.avatar} alt="Avatar" style={{
                width: "30px",
                height: "30px",
              }} />
            </Typography>
            <Typography variant="body1" component="span" style={{ fontWeight: "bold", fontSize: "1.5rem", marginLeft: "1rem" }}>{selectedConversation.fullname}</Typography>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div style={{
      paddingLeft: '1rem',
      paddingRight: '1rem',
      textAlign: 'center',
      color: 'var(--primary-bg)',
      fontWeight: 600,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: '0.5rem'
    }}>
      <Typography variant="body1" component="h6" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Welcome 👋 {authUser?.fullname} ❄</Typography>
      <Typography variant="body1" component="p" style={{ fontSize: "1.3rem" }}>Select a chat to start messaging</Typography>
      <TiMessages style={{ fontSize: '4rem' }} className="text-3xl md:text-6xl text-center" />
    </div>
  );
};
