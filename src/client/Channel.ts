import Client from "./Client";
import ChannelTypes from "../types/ChannelTypes";
import CategoryChannel from "../modules/CategoryChannel";

type Overwrite = {
  id: string;
  type: number;
  allow: string;
  deny: string;
};

export default abstract class Channel {
  id: string;
  type: string;
  name: string;
  guild_id?: string | null;
  position?: number;
  permission_overwrites?: Array<Overwrite>;
  readonly client: Client;

  constructor(data: any, client: Client) {
    this.client = client;
    this.id = data.id;
    this.type = typeof data.type === "number" ? this.getType(data.type) : data.type;
    this.name = data.name;
    this.guild_id = data.guild_id;
    this.position = data.position;
    this.permission_overwrites = data.permission_overwrites;
  }

  private getType(type: number): string {
    const tip: number = type;
    return ChannelTypes[tip] ?? "";
  }
}
