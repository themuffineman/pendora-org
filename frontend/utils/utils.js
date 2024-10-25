import randomUUID from 'crypto'

export class InitSocket{

    constructor(params){
        this.url = params.socketUrl;
        this.onMessage = params.onMessage;
        this.onClose = params.onClose;
        this.onOpen = params.onOpen;
        this.fetchUrl = params.fetchUrl;
    }
    async connect(){
        const uniqueId = randomUUID()
        const socket = new WebSocket(this.url)
        socket.onopen = this.onOpen;
        socket.onmessage = this.onMessage;
        socket.onerror = this.onError;
        socket.onclose = this.onClose
        return {id: uniqueId}
    }
}

export const proFeatures = [
    "TikTok Ads",
  "LinkedIn Ads",
  "Save Ads for later",
  "Faster lookup speeds",
  "No daily limit",
  "Extract all ad history",
]