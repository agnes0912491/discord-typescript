interface Embed {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

interface EmbedFooter {
  text?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

interface EmbedImage {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

interface EmbedThumbnail {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

interface EmbedVideo {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

interface EmbedProvider {
  name?: string;
  url?: string;
}

interface EmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export default Embed