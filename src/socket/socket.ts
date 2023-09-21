import io from "socket.io-client";

const devModeToggle = true;
const socket = devModeToggle
  ? io("http://localhost:8080")
  : io("https://one4-sentences.onrender.com/");

export default socket;
