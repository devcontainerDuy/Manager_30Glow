import { Notyf } from "notyf";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.notyf = new Notyf({
  duration: 3000,
  position: { x: "right", y: "top" },
  dismissible: true,
});

window.pusher = new Pusher("a41649538081bc522756", {
  cluster: "ap1",
  forceTLS: true,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  encrypted: true,
  wsHost: "ws-ap1.pusher.com",
  wsPort: 443,
  wssPort: 443,
});

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "a41649538081bc522756",
  cluster: "ap1",
  forceTLS: true,
  wsHost: "ws-ap1.pusher.com",
  wsPort: 443,
  wssPort: 443,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  encrypted: true,
});
