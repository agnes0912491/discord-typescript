import Client from "../client/Client";
import UserData from "./UserData";

type PresenceStatus = "idle" | "dnd" | "online" | "offline";
type ActivityType = 0 | 1 | 2 | 3 | 4 | 5;

interface Activity {
  name: string;
  type: ActivityType;
  url?: string;
}

interface ClientStatus {
  desktop?: PresenceStatus;
  mobile?: PresenceStatus;
  web?: PresenceStatus;
}

interface PresenceData {
  status?: PresenceStatus;
  activities?: Activity[];
  client_status?: ClientStatus;
}

export default class ClientUser extends UserData {
  private client: Client;

  constructor(data: any, client: Client) {
    super(data);
    this.client = client;
  }

  setPresence(presenceData: PresenceData) {
    return this.client.websocket.send({
      op: 3,
      d: {
        since: null, 
        afk: false, 
        ...presenceData,
      },
    });
  }
}
