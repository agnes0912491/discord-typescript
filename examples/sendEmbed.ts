import { Client, Embed } from "../src/index"; 

(async () => {
  const bot = new Client();

  const token = "";
  
  bot.on("hazir", async () => {  
    const channel = await bot.getChannel("channelId")
    const embed1 = new Embed()
    .belirleAciklama("31")
    .belirleRenk("#eb4034")
    
    const message = await channel.send({
      content: "sdfgsdgdsfg",
      tts: false,
      embeds: [embed1],
      components: []
    }) 
  });

  const start = async () => await bot.login(token);
  await start();
})();
