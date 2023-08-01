interface ChannelTip {
  [key: number]: string;
}

const ChannelTypes: ChannelTip = {
  0: "GUILD_TEXT",
  1: "DM",
  2: "GUILD_VOICE",
  3: "GROUP_DM",
  4: "GUILD_CATEGORY",
  5: "GUILD_ANNOUNCEMENT",
  10: "ANNOUNCEMENT_THREAD",
  11: "PUBLIC_THREAD",
  12: "PRIVATE_THREAD",
  13: "GUILD_STAGE_VOICE",
  14: "GUILD_DIRECTORY",
  15: "GUILD_FORUM",
};

export default ChannelTypes;
