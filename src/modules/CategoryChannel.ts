import Channel from "../client/Channel";
import Client from "../client/Client";

export default class CategoryChannel extends Channel {
  constructor(data: any, client: Client) {
    super(data, client);
  }
}
