import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";
import useGlobalState from "./State/GlobalState";

function App() {
  // const [user, setUser] = useState("");
  const [user, setUser] = useGlobalState("user");
  const [room, setRoom] = useGlobalState("room");
  const [messages, setMessages] = useGlobalState("messages");
  const [userSet, setUserSet] = useState(false);
  const [socket, setSocket] = useGlobalState("socket");

  /* const [room, setRoom] = useState({
    room: "random-room",
    autoGenerated: true,
  }); */

  useEffect(() => {
    if (socket && (socket.connected === true || socket.connected === false)) {
      socket.on("connect", () => {
        // console.log(socket.connected); // true

        socket.on("message", (msg) => {
          // console.log("In Msg Listner");
          // console.log("Msg: ", msg);
          setMessages((prev) => [...prev, msg]);
          // console.log(messages);
        });
      });

      socket.on("disconnect", () => {
        // console.log(socket.connected); // false
      });
    }
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    const urlParamRoom = new URLSearchParams(window.location.search).get(
      "room"
    );

    if (urlParamRoom) {
      setRoom({
        name: urlParamRoom && urlParamRoom.toString().trim(),
        autoGenerated: false,
      });
    }

    // eslint-disable-next-line
  }, []);

  const setUserName = () => (
    <div className="container d-flex justify-content-center align-items-center custom-username-input">
      <div className="m-4 p-4 border border-info rounded-3 text-start">
        <h4
          className={
            room.autoGenerated ? "d-none" : `text-center mb-4 text-muted`
          }
        >
          <span className="text-danger">Room:</span> {room.name}
        </h4>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Your Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required={true}
            placeholder="Username"
          />
        </div>

        <div className="d-grid gap-2">
          <button
            className="btn btn-outline-info"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (user && user !== "") {
                const tmp = io("localhost:5100");
                const payload = {
                  user,
                  room: room.name,
                };

                tmp.emit("joinRoom", payload);
                setSocket(tmp);
                setUserSet(true);
              }
            }}
          >
            {`${
              room.autoGenerated === true
                ? "Create Random Room and Join"
                : "Join Room"
            }`}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <Navbar userSet={userSet} />
      <div className="bg-dark text-light h-100">
        {user && userSet && user !== "" ? <Chat /> : setUserName()}
      </div>
    </div>
  );
}

export default App;
