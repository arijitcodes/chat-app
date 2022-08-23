import React, { useEffect, useRef } from "react";
import ChatItem from "./ChatItem";

import useGlobalState from "../State/GlobalState";

const AllChats = () => {
  const [user] = useGlobalState("user");
  const [room] = useGlobalState("room");
  // const [socket] = useGlobalState("socket");
  const [messages] = useGlobalState("messages");

  const bottomElementRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomElementRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="mb-2">
        👉🏻 <strong>Room: </strong> {room.name} 👉🏻 <strong>User: </strong> {user}
      </div>
      <div className="custom-body-height-allchat mt-4 mx-4 pt-4 border rounded-3 border-info border-3">
        <div
          className="pre-scrollable overflow-auto"
          style={{ maxHeight: "calc(100vh - 210px)" }}
        >
          {messages &&
            messages.map((chat, index) => (
              <div
                align={
                  chat.user === user
                    ? "right"
                    : chat.user.toLowerCase() === "bot"
                    ? "center"
                    : ""
                }
                key={index + "_" + chat.timestamp}
              >
                <ChatItem data={chat} index={index} />
              </div>
            ))}

          <div ref={bottomElementRef}></div>
        </div>
      </div>
    </>
  );
};

export default AllChats;
