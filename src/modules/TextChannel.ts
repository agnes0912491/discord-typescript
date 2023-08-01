import Channel from "../client/Channel";
import Client from "../client/Client";
import MessageData from "../types/Message";
import CategoryChannel from "./CategoryChannel";

export default class TextChannel extends Channel {
  topic?: string;
  nsfw?: boolean;
  last_message_id?: string;
  rate_limit_per_user?: number;
  parent_id?: string | null;
  parent?: CategoryChannel | null;

  constructor(data: any, client: Client) {
    super(data, client);
    this.topic = data.topic;
    this.nsfw = data.nsfw;
    this.last_message_id = data.last_message_id;
    this.rate_limit_per_user = data.rate_limit_per_user;
    this.parent_id = data.parent_id;
    this.parent = data.parent_id ? this.getParent(data.parent_id) : null;
  }

  private getParent(parent_id: number): any {
    const parent = this.client.channels
      .filter((channel: Channel) => channel.id === parent_id.toString())
      .first();
    return new CategoryChannel(parent, this.client);
  }

  async send(data: MessageData | string) {
    const response: any = await this.client.rest?.post(
      `/channels/${this.id}/messages`,
      typeof data === "string" ? { content: data } : data
    );
    return response;
  }
}
