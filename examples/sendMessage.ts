import { Client } from "../src/index"; 

(async () => {
  const bot = new Client();

  const token = "";
  
  bot.on("hazir", async () => {  
     const channel = await bot.getChannel("channelId")
     const message = await channel.send({
       content: "sdfgsdgdsfg",
       tts: false,
       embeds: [],
       components: []
    }) 
  }); 

  const start = async () => await bot.login(token);
  await start();
})();
