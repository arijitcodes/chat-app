import React, { useState } from "react";
import useGlobalState from "../State/GlobalState";

const TypeChat = () => {
  const [message, setMessage] = useState("");
  const [socket] = useGlobalState("socket");
  const [user] = useGlobalState("user");

  return (
    <div className="fixed-bottom mt-4 mx-4">
      <form className="row g-3">
        <div className="col">
          <label htmlFor="message" className="visually-hidden">
            Message
          </label>
          <input
            type="text"
            className="form-control bg-dark text-white"
            id="message"
            placeholder="Your Message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="col-auto">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              socket.emit("message", {
                user,
                message,
                timestamp: Date.now(),
              });
              setMessage("");
            }}
            className="btn btn-outline-info mb-3"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default TypeChat;
