import React from "react";
import useGlobalState from "../State/GlobalState";

const ChatItem = ({ data }) => {
  const [me] = useGlobalState("user");
  const isBot = data.user.toLowerCase() === "bot";
  // const me = localStorage.getItem("chat-app-user");

  return (
    <>
      <div
        className={`card ${
          !isBot && "rounded rounded-3"
        } text-muted text-start mx-4 my-4 col-8 col-md-5`}
        style={{
          backgroundColor: "#0e0e0e",
          // width: "fit-content",
          // minWidth: "calc(18rem)",
          // maxWidth: "60%",
        }}
      >
        <div className="card-body">
          <h5 className={`card-title fw-bold ${isBot && "d-none"}`}>{`${
            data.user === me ? data.user + " (You)" : data.user
          }`}</h5>
          {/* <h6 className="card-subtitle mb-2 text-white">{data.timestamp}</h6> */}
          <p className="card-text fw-normal">
            {isBot && "🤖: "}
            {data.message}
          </p>
        </div>
        <div className={`card-footer text-muted fw-light ${isBot && "d-none"}`}>
          {new Date(data.timestamp).toLocaleString()}
        </div>
      </div>
    </>
  );
};

export default ChatItem;
