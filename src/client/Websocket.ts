import WebSocket from "ws";

class Websocket {
  public startTime: Date;
  private ws: WebSocket | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private eventListeners: { [eventName: string]: Function[] } = {};
  private autoReconnect: boolean;
  private reconnectInterval: number;

  constructor(autoReconnect: boolean = true, reconnectInterval: number = 5000) {
    this.ws = null;
    this.autoReconnect = autoReconnect;
    this.reconnectInterval = reconnectInterval;
    this.startTime = new Date();
  }

  public connect(token: string) {
    this.ws = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");

    this.ws.on("open", async () => {
      await this.identify(token);
      this.startHeartbeat();
      this.startTime = new Date();
    });

    this.ws.on("message", (data: WebSocket.Data) => {
      const payload = JSON.parse(data.toString());
      this.handlePayload(payload);
    });

    this.ws?.addEventListener(
      "close",
      (event: { code: number; reason: string }) => {
        if (this.autoReconnect) {
          console.log(event.code, event.reason)
          this.handleDisconnect(token);
        }
        this.stopHeartbeat();
      }
    );
  }

  private identify(token: string) {
    const identifyPayload = {
      op: 2,
      d: {
        token: token,
        intents: 513, // Replace with your desired intents
        properties: {
          $os: "linux",
          $browser: "custom-discord-wrapper",
          $device: "custom-discord-wrapper",
        },
      },
    };

    this.ws?.send(JSON.stringify(identifyPayload));
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ op: 1, d: null }));
      }
    }, 30000); // Discord expects heartbeat every 30 seconds
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  }

  private handlePayload(payload: any) {
    if (payload.t) {
      const eventName = payload.t;
      const eventData = payload.d;
      if (this.eventListeners[eventName]) {
        this.eventListeners[eventName].forEach((listener) => {
          listener(eventData);
        });
      }
    }
  }

  public on(eventName: string, listener: Function) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(listener);
  }

  public send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) { 
      this.ws.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not connected. Cannot send data.");
    }
  }

  private handleDisconnect(token: string) {
    if (this.autoReconnect) {
      console.log(
        "WebSocket connection closed unexpectedly. Trying to reconnect..."
      );
      this.ws?.close();
      this.ws = null;
      setTimeout(() => this.connect(token), this.reconnectInterval);
    }
  }
}

export default Websocket;
