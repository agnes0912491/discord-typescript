import { Client } from "../src/index"; 

const bot = new Client();

const token = "";
  
bot.on("hazir", async () => {  
     const channel = bot.channels.get("channelId")
     const message = await channel.send({
       content: "sdfgsdgdsfg",
       tts: false,
       embeds: [],
       components: []
    }) 
  }); 

bot.login(token);
