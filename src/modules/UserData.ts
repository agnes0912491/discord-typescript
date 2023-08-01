export default class UserData {
  id: string;
  username: string;
  avatar: string | null;
  banner: string | null;
  bannerColor: string | null;
  accentColor: string | null;
  globalName: string;

  constructor(data: any) {
    this.id = data.id;
    this.username = data.username;
    this.globalName = data.global_name;
    this.avatar = this.getAvatar(data.avatar);
    this.banner = this.getBanner(data.banner);
    this.bannerColor = data.banner_color;
    this.accentColor = data.accent_color;
  }

  getAvatar(avatar: string | null): string | null {
    const new_avatar =
      avatar === null
        ? null
        : `https://cdn.discordapp.com/avatars/${this.id}/${avatar}?size=4096`;
    return new_avatar;
  }

  getBanner(banner: string | null): string | null {
    const new_banner =
      banner === null
        ? null
        : `https://cdn.discordapp.com/banners/${this.id}/${banner}?size=4096`;
    return new_banner;
  }
}
