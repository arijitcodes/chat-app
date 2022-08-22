import React, { useEffect, useRef, useState } from "react";
import ChatItem from "./ChatItem";

import useGlobalState from "../State/GlobalState";

const AllChats = () => {
  const [user] = useGlobalState("user");
  const [room] = useGlobalState("room");
  const [socket] = useGlobalState("socket");
  const [messages, setMessages] = useGlobalState("messages");

  const [chatData, setChatData] = useState([
    {
      user: "User 1",
      message: "Hi",
      timestamp: Date.now(),
    },
    {
      user: "User 3",
      message: "Hiii",
      timestamp: Date.now(),
    },
    {
      user: "User 1",
      message: "Hello",
      timestamp: Date.now(),
    },
    {
      user: "User 2",
      message: "Hello",
      timestamp: Date.now(),
    },
    {
      user: "User 1",
      message: "Hi there User 2",
      timestamp: Date.now(),
    },
    {
      user: "User 2",
      message: "What's up ?",
      timestamp: Date.now(),
    },
    {
      user: "User 4",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, soluta quod? Facere molestiae doloribus nostrum, voluptate delectus est repellat enim.",
      timestamp: Date.now(),
    },
  ]);

  const bottomElementRef = useRef(null);
  // const meUser = localStorage.getItem("chat-app-user");
  // const myRoom = JSON.parse(localStorage.getItem("chat-app-room")).room;

  /* useEffect(() => {
    socket.on("message", (msg) => {
      console.log("In Msg Listner");
      console.log("Msg: ", msg);
      setMessages((prev) => [...prev, msg]);
      console.log(messages);
    });
  }, []); */

  /*   useEffect(() => {
    setTimeout(() => {
      setChatData((prev) => [
        ...prev,
        {
          user: "User Test",
          message: "Late Message Scroll Test",
          timestamp: Date.now(),
        },
      ]);
    }, 3000);
  }, []);
 */
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomElementRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="mb-2">
        👉🏻 <strong>Room: </strong> {room.name} 👉🏻 <strong>User: </strong> {user}
      </div>
      <div className="mt-4 mx-4 pt-4 border rounded-3 border-info border-3">
        <div
          className="pre-scrollable overflow-auto"
          style={{ maxHeight: "75vh" }}
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
