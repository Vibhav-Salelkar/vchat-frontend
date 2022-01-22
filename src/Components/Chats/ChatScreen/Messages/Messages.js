import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../../../Store/ChatProvider";

const Messages = ({ messages }) => {
  const { user } = ChatState();
  const isSameSender = (messages, message, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== message.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  const isSameSenderMargin = (messages, m, i, userId) => {  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };

  const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, i) => {
           return  (
          <div style={{display: "flex"}} key={message._id}>
             {(isSameSender(messages, message, i, user._id) ||
              isLastMessage(messages, i, user._id)) &&(
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                  <Avatar
                    mt={'0.5rem'}
                    mr={1}
                    size={'sm'}
                    cursor={'pointer'}
                    name={message.sender.name}
                    src={message.sender.avatar}
                  />
              </Tooltip>
            )}
            <span
                style={{
                    backgroundColor: `${
                        message.sender._id === user._id ? '#bee3f8': '#b9f5d0'
                    }`,
                    borderRadius: '15px',
                    padding: '5px 15px',
                    maxWidth: '80%',
                    marginLeft: isSameSenderMargin(messages, message, i, user._id),
                    marginTop: isSameUser(messages, message, i, user._id) ? 3: 10,
                }}
            >
                {message.message}
            </span>
          </div>
        )})}
    </ScrollableFeed>
  );
};

export default Messages;
