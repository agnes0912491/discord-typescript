// Embed.ts

function hexToDecimal(hex: string): number {
  const cleanedHex = hex.replace("#", "");
  const decimal = parseInt(cleanedHex, 16);
  return decimal;
}

type EmbedFooter = {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
};

type EmbedImage = {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
};

type EmbedThumbnail = {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
};

type EmbedVideo = {
  url?: string;
  height?: number;
  width?: number;
};

type EmbedProvider = {
  name?: string;
  url?: string;
};

type EmbedAuthor = {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
};

type EmbedField = {
  name: string;
  value: string;
  inline?: boolean;
};

class Embed {
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

  baslik(title: string): Embed {
    this.title = title;
    return this;
  }

  aciklama(description: string): Embed {
    this.description = description;
    return this;
  }

  baglanti(url: string): Embed {
    this.url = url;
    return this;
  }

  zamanDamgasi(timestamp: string): Embed {
    this.timestamp = timestamp;
    return this;
  }

  renk(color: number | string): Embed {
    if (typeof color === "string") { 
      this.color = hexToDecimal(color);
    } else {
      this.color = color;
    }
    return this;
  }

  altbilgi(footer: EmbedFooter): Embed {
    this.footer = footer;
    return this;
  }

  onResim(image: EmbedImage): Embed {
    this.image = image;
    return this;
  }

  arkaResim(thumbnail: EmbedThumbnail): Embed {
    this.thumbnail = thumbnail;
    return this;
  }

  vidyo(video: EmbedVideo): Embed {
    this.video = video;
    return this;
  }

  yazar(author: EmbedAuthor): Embed {
    this.author = author;
    return this;
  }

  alanlar(fields: EmbedField[]): Embed {
    this.fields = fields;
    return this;
  }

  alan(field: EmbedField): Embed {
    this.fields?.push(field)
    return this;
  }
}

export default Embed;
