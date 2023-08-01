class SlashCommand {
  id?: string;
  name: string;
  description: string;
  options: any;
  handler: Function;
  guild_id?: string; // Yeni özellik: Sunucu ID'si
  type: string; // Yeni özellik: Komut türü
  command_type: number;

  constructor(
    id: string,
    name: string,
    description: string,
    options: any,
    handler: Function,
    type: string,
    command_type: number,
    
    guildId?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.options = options;
    this.handler = handler;
    this.type = type; // Komut türünü belirtiyoruz
    this.command_type = command_type; // Komut türünü belirtiyoruz
    this.guild_id = guildId;
  }
}
export default SlashCommand;
