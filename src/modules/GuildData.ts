export default class GuildData {
  id: string;
  name: string;
  icon: string | null;
  owner: object | boolean; 
  permissions: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.icon = data.icon;
    this.owner = data.owner;
    this.permissions = data.permissions;
  }

  get iconURL(): string | null { 
    return this.icon ? `https://cdn.discordapp.com/icons/${this.id}/${this.icon}` : null
  }
}
