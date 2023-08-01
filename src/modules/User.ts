// src/modules/User.ts

import Client from "../client/Client";
import Rest from "../client/Rest";
import GuildData from "./GuildData";
import UserData from "./UserData";

class User {
  private rest: Rest;
  private client: Client;

  constructor(rest: Rest, client: Client) {
    this.rest = rest;
    this.client = client;
  }

  public async getUser(userId: string) {
    try {
      const response: any = await this.rest.get(`/users/${userId}`);
      return new UserData(response);
    } catch (error) {
      console.error("Error fetching channel:", (error as any).message);
      throw error;
    }
  }

  public async getUsers() {
    const data: UserData[] = [];
    this.client.guilds.forEach(async (guild) => {
      const request: UserData[] = await this.rest.get(
        `/guilds/${guild.id}/members`
      );
      const response = request.map((user: any) => user.user);
      data.push(...response);
    });
    return data;
  }

  // Diğer kanal fonksiyonlarını burada tanımlayabilirsiniz.
}

export default User;
