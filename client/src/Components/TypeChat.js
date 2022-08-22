import React, { useState } from "react";

const TypeChat = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed-bottom my-md-4 mx-4">
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
          <button type="submit" className="btn btn-outline-info mb-3">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default TypeChat;
