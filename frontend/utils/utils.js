import { v4 as uuidv4 } from "uuid";

export class InitSocket {
  constructor({ url, onMessage, onClose, onOpen, onError }) {
    this.url = url;
    this.onMessage = onMessage;
    this.onClose = onClose;
    this.onOpen = onOpen;
    this.onError = onError;
    this.id = uuidv4(); // Generate a unique ID for the instance
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      if (this.onOpen) this.onOpen();
      this.socket.send(this.id); // Send the UUID once the connection is open
    };

    this.socket.onmessage = this.onMessage;
    this.socket.onerror = this.onError;
    this.socket.onclose = this.onClose;

    return this.id; // Return the unique ID if needed
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
