import { EventEmitter } from "events";
import Client from "../client/Client";
import SlashCommand from "../Base/SlashCommand";

export default class SlashCommandHandler extends Map<string, SlashCommand> {
  readonly client: Client;
  private emitter: EventEmitter;

  constructor(client: Client) {
    super();
    this.client = client;
    this.emitter = new EventEmitter();
  }

  // Add a command to the handler
  public async add(value: SlashCommand): Promise<SlashCommandHandler> {
    // Handle the "new_command" event asynchronously
    await this.handleNewCommand(value);

    // Return the updated SlashCommandHandler
    return this;
  }

  private async handleNewCommand(value: SlashCommand): Promise<void> {
    if (value.type === "global") {
      //komutu global olarak kayıt et
      const request: any = await this.client.rest?.post(
        `/applications/${this.client.applicationId}/commands`,
        {
          name: value.name,
          description: value.description,
          options: value.options,
          type: value.command_type,
        }
      );
      this.set(
        request.id,
        new SlashCommand(
          request.id,
          request.name,
          request.description,
          value.options,
          value.handler,
          value.type,
          value.command_type
        )
      );
    } else {
      //komutu sunucu için kayıt et
    }
  }

  private async handleRemoveCommand(
    key: string,
    guild_id?: string
  ): Promise<boolean> {
    const request: any = await this.client.rest?.delete(
      guild_id
        ? `/applications/${this.client.applicationId}/guilds/${guild_id}/commands/${key}`
        : `/applications/${this.client.applicationId}/commands/${key}`
    );
    return true;
  }

  // Get a command by key
  public getCommand(key: string): SlashCommand | undefined {
    return this.get(key);
  }

  // Remove a command by key
  public async removeCommand(key: string, guild_id?: string): Promise<boolean> {
    await this.handleRemoveCommand(key, guild_id);
    return this.delete(key);
  }

  // Emit an event
  public emitEvent(eventName: string, ...args: any[]): boolean {
    return this.emitter.emit(eventName, ...args);
  }

  // Listen for an event
  public addEventListener(
    eventName: string,
    listener: (...args: any[]) => void
  ): this {
    this.emitter.on(eventName, listener);
    return this;
  }

  // Remove an event listener
  public removeEventListener(
    eventName: string,
    listener: (...args: any[]) => void
  ): this {
    this.emitter.off(eventName, listener);
    return this;
  }
}
