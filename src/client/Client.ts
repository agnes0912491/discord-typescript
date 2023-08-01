import Websocket from "./Websocket";
import EventNames from "../types/Events";
import Rest from "./Rest";
import Channel from "./Channel";
import Guild from "../modules/Guild";
import UserData from "../modules/UserData";
import User from "../modules/User";
import ClientUser from "../modules/ClientUser";
import Logger from "./Logger";
import SlashCommandHandler from "../modules/SlashCommand";

//Managers
import GuildData from "../modules/GuildData";
import { Collection } from "./Collection";
import ChannelTypes from "../types/ChannelTypes";
import TextChannel from "../modules/TextChannel";
import CategoryChannel from "../modules/CategoryChannel";

type ClientOptions = {
  imageSize?: string;
  autoReconnect?: boolean;
  maxReconnectAttempts?: number;
  reconnectInterval?: number;
  debugMode?: boolean | string | string[];
};

enum CommandType {
  Global = "global",
  Guild = "guild",
}

// src/index.ts
class Client {
  public channels: Collection<string, Channel>;
  public guilds: Collection<string, GuildData>;
  public users: Collection<string, UserData>;
  public user: ClientUser | null;
  public logger: Logger;
  public rest: Rest | null;
  public uptime: number; // uptime özelliği eklendi
  public startTime: Date | null; // startTime özelliği eklendi
  public slashCommands: SlashCommandHandler;
  public websocket: Websocket;
  public CommandType!: typeof CommandType;
  public applicationId: string | null; 
  private token: string;
  private options?: ClientOptions;

  constructor(
    options: ClientOptions = {
      autoReconnect: true,
      reconnectInterval: 5000,
    }
  ) {
    this.token = "";
    this.options = options;
    this.rest = null;
    this.websocket = new Websocket(
      this.options.autoReconnect,
      this.options.reconnectInterval
    );
    this.logger = new Logger(this.options.debugMode); // Logger sınıfından bir örnek oluşturuyoruz
    this.channels = new Collection<string, Channel>();
    this.guilds = new Collection<string, GuildData>();
    this.users = new Collection<string, UserData>();
    this.slashCommands = new SlashCommandHandler(this);
    this.uptime = 0;
    this.startTime = null;
    this.applicationId = "";
    this.user = null; 
    // Initialization logic for your custom Discord API wrapper
    this.logger.info("Custom Discord Wrapper is initialized!");
  }

  private async getApplicationInfo(): Promise<object> {
    if (this.rest) {
      return await this.rest.getApplicationInfo();
    } else {
      throw new Error("Rest client is not initialized.");
    }
  }

  public async login(token: string) {
    this.token = token;
    this.rest = new Rest("https://discord.com/api/v9", this.token);

    if (!this.applicationId) {
      const application: any = await this.getApplicationInfo();
      this.applicationId = application.id;
      this.user = new ClientUser(application.bot, this);
    }

    // Önce guild verilerini çek
    await this.getGuilds(this.rest);
    await this.getUsers(this.rest);
    await this.getChannels(this.rest);

    this.websocket.connect(token);
    this.startTime = this.websocket.startTime;
    this.updateUptime(this.startTime);
    // Logic to handle login with the provided token
    this.logger.debug(`Logged in with token: ${token}`);
  }

  // uptime bilgisini hesaplamak için bir metod ekleyelim
  calculateUptime(startTime: Date | null) {
    const currentTime = new Date();
    let uptime = startTime ? currentTime.getTime() - startTime.getTime() : 0;
    return uptime;
  }

  private updateUptime(startTime: Date | null) {
    this.uptime = this.calculateUptime(startTime);

    // Her 30 saniyede bir uptime bilgisini güncelliyoruz
    setTimeout(() => {
      this.updateUptime(startTime);
    }, 30000);
  }

  private async getGuilds(rest: Rest): Promise<void> {
    const response: any = await rest?.get(`/users/@me/guilds`);
    const data: GuildData[] = [];
    response.forEach((guild: GuildData) => {
      this.guilds.add(guild.id, new GuildData(guild));
    });
  }

  private async getUsers(rest: Rest): Promise<void> {
    const data: UserData[] = [];
    for (const guild of this.guilds.values()) {
      const request: UserData[] = await rest.get(`/guilds/${guild.id}/members`);
      const response: UserData[] = request.map((user: any) => user.user);
      data.push(...response);
    }

    // Add the fetched users to the this.users collection
    for (const user of data) {
      this.users.add(user.id, new UserData(user));
    }
  }

  private async getChannels(rest: Rest): Promise<void> {
    const data: any[] = [];

    for (const guild of this.guilds.values()) {
      try {
        const response: any[] = await rest.get(`/guilds/${guild.id}/channels`);
        data.push(...response);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    }

    // Add the fetched channels to the this.channels collection
    data.forEach((channel: Channel) => {
      // console.log(channel)
      const channelType = ChannelTypes[Number(channel.type)];
      if (channelType === "GUILD_TEXT") {
        this.channels.add(channel.id, new TextChannel(channel, this));
      } else if (channelType === "GUILD_CATEGORY") {
        this.channels.add(channel.id, new CategoryChannel(channel, this));
        //todo: Category Channel
      } else if (channelType === "GUILD_VOICE") {
        //todo: Voice Channel
      }
    });
  }

  // Kanal sınıfını kullanarak Discord API'den kanal bilgisi alalım
  public async getChannel(channelId: string) {
    if (!this.rest) {
      throw new Error(
        "Client is not logged in. Please call login() before using API methods."
      );
    }

    // const channelModule = new Channel(this.rest, this);
    // return await channelModule.getChannel(channelId);
  }

  public async getUser(userId: string) {
    if (!this.rest) {
      throw new Error(
        "Client is not logged in. Please call login() before using API methods."
      );
    }

    const userModule = new User(this.rest, this);
    return await userModule.getUser(userId);
  }

  public async getGuild(guildId: string) {
    if (!this.rest) {
      throw new Error(
        "Client is not logged in. Please call login() before using API methods."
      );
    }

    const guildModule = new Guild(this.rest, this);
    return await guildModule.getGuild(guildId);
  }

  public on(eventName: keyof typeof EventNames, listener: Function) {
    this.websocket.on(EventNames[eventName], listener);
  }
  // Add more methods and functionalities here as needed
}

export default Client;
