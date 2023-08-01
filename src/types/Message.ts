import Embed from "./Embed";

const MessageComponentType = {
  1: "Action Row",
  2: "Button",
  3: "String Select",
  4: "Text Input",
  5: "User Select",
  6: "Role Select",
  7: "Mentionable Select",
  8: "Channel Select",
};

interface AllowedMention {
  roles?: boolean;
  users?: boolean;
  everyone?: boolean;
}

interface Message {
  message_id?: string;
  channel_id?: string;
  guild_id?: string;
  fail_if_not_exists?: boolean;
}

interface Component {
  type: typeof MessageComponentType;
  components: SubComponent[];
}

interface SubComponent {
  type: number;
  label: string;
  style: number;
  custom_id: string;
}

interface Attachment {
  id: string;
  filename: string;
  description?: string;
  content_type?: string;
  size: number;
  url: string;
  proxy_url: string;
  height?: number | null;
  width?: number | null;
  ephemeral?: boolean;
  duration_secs?: number;
  waveform?: string;
  flags?: number;
}

interface MessageData {
  content: string;
  nonce?: number | string;
  tts: boolean;
  embeds: Embed[];
  allowed_mentions?: AllowedMention[];
  message_reference?: Message;
  components: Component[];
  sticker_ids?: [];
  files?: [];
  payload_json?: string;
  attachments?: Attachment[];
  flags?: number;
}

export default MessageData;
