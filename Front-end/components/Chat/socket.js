import { io } from "socket.io-client";

const URL = "http://localhost:4000";
const socket = io(URL);

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;