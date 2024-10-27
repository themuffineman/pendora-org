import { v4 as uuidv4 } from "uuid";

export class InitSocket {
  constructor({ url, onMessage, onClose, onOpen, onError }) {
    this.url = url;
    this.onMessage = onMessage;
    this.onClose = onClose;
    this.onOpen = onOpen;
    this.onError = onError;
  }
  connect() {
    const id = uuidv4();
    const socket = new WebSocket(this.url);
    socket.onopen = this.onOpen;
    socket.onmessage = this.onMessage;
    socket.onerror = this.onError;
    socket.onclose = this.onClose;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(id);
    } else {
      console.error("Cannot send data.");
    }
    return id;
  }
}

export const proFeatures = [
  "TikTok Ads",
  "LinkedIn Ads",
  "Save Ads for later",
  "Faster lookup speeds",
  "No daily limit",
  "Extract all ad history",
];
export const proPrice = 1.99;
