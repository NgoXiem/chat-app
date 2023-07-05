import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false
});

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:8000";
const URL = "http://localhost:8000";

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
  console.log("connected")
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("message", () => {
  console.log("message")
});
