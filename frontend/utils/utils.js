import randomUUID from "crypto";

export class InitSocket {
  constructor({ url, onMessage, onClose, onOpen, onError }) {
    this.url = url;
    this.onMessage = onMessage;
    this.onClose = onClose;
    this.onOpen = onOpen;
    this.onError = onError;
  }
  connect() {
    const socket = new WebSocket(this.url);
    socket.onopen = this.onOpen;
    socket.onmessage = this.onMessage;
    socket.onerror = this.onError;
    socket.onclose = this.onClose;
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
