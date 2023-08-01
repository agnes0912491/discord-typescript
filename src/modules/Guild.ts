// src/modules/Channel.ts

import Client from "../client/Client";
import Rest from "../client/Rest";
import GuildData from "./GuildData";

class Guild {
  private rest: Rest;
  private client: Client;

  constructor(rest: Rest, client: Client) {
    this.rest = rest;
    this.client = client;
  }

  public async getGuild(guildId: string) {
    try {
      const response: any = await this.rest.get(`/guilds/${guildId}`);
      return new GuildData(response);
    } catch (error) {
      console.error("Error fetching channel:", (error as any).message);
      throw error;
    }
  }

  public async getGuilds() {
    const response: any = await this.rest.get(`/users/@me/guilds`);
    const data: GuildData[] = [];
    response.forEach((guild: GuildData) => {
      data.push(guild);
    });  
    return data;
  }

  // Diğer kanal fonksiyonlarını burada tanımlayabilirsiniz.
}

export default Guild;
