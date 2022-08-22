import React from "react";
import useGlobalState from "../State/GlobalState";

const ChatItem = ({ data }) => {
  const [me] = useGlobalState("user");
  // const me = localStorage.getItem("chat-app-user");

  return (
    <>
      <div
        className="card rounded rounded-3 text-muted text-start mx-4 my-4 col-8 col-md-5"
        style={{ backgroundColor: "#0e0e0e" }}
      >
        <div className="card-body">
          <h5 className="card-title fw-bold">{`${
            data.user === me ? data.user + " (You)" : data.user
          }`}</h5>
          {/* <h6 className="card-subtitle mb-2 text-white">{data.timestamp}</h6> */}
          <p className="card-text fw-normal">{data.message}</p>
        </div>
        <div className="card-footer text-muted fw-light">
          {new Date(data.timestamp).toLocaleString()}
        </div>
      </div>
    </>
  );
};

export default ChatItem;
