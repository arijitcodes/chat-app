require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const users = new Map();

// Middlewares

// Express API Server Routes
// Test Route - to check if server is up or not
app.get("/api/test", (req, res) => {
  return res.send("🦄🌈✨👋🏻🌎🌍🌏👋🏻✨🌈🦄");
});

//
// Serve static assets in Production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Listening to Port and Starting Server
const PORT = 5100 || process.env.PORT;
const server = app.listen(PORT, (err) => {
  if (err) {
    console.error("Error Occured! Failed to start the server!");
    console.error(err);
  } else {
    console.log(`✨ Server is listening on port ${PORT}`);
    console.log(`📳 Node ENV: ${process.env.NODE_ENV}`);
  }
});

// Socket.IO System
const io = new Server(server);

// on Successful Socket Connection Event
io.on("connection", (socket) => {
  console.log("User Connected... Socket ID: ", socket.id);

  // on Join Room Event
  socket.on("joinRoom", ({ room, user }) => {
    socket.join(room);
    users.set(socket.id, { room, user });
    socket.broadcast.to(room).emit("message", {
      user: "Bot",
      message: `${user} has joined the chat...`,
      timestamp: Date.now(),
    });
  });

  // on Message Event
  socket.on("message", (msg) => {
    io.to(users.get(socket.id).room).emit("message", msg);
  });

  // On Socket Disconnection
  socket.on("disconnect", () => {
    const userData = users.get(socket.id);
    users.delete(socket.id);
    socket.broadcast.to(userData.room).emit("message", {
      user: "Bot",
      message: `${userData.user} has left the chat...`,
      timestamp: Date.now(),
    });
    console.log("User Disconnected. Socker ID: ", socket.id);
  });
});
