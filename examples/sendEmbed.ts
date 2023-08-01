import { Client, Embed } from "../src/index"; 
 
const bot = new Client();

const token = "";
  
bot.on("hazir", async () => {  
    const channel = bot.channels.get("channelId")
    const embed1 = new Embed()
    .aciklama("deneme")
    .renk("#eb4034")
    .onResim()
    .arkaResim()
    .yazar({ isim: null, profil: null })
    .alan([{
      isim: null,
      deger: null
    }])
    
    const message = await channel.send({
      content: "sdfgsdgdsfg",
      tts: false,
      embeds: [embed1],
      components: []
    }) 
});

bot.login(token);
