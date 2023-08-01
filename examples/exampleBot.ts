import { Client, Embed } from "../src/index"; 

const bot = new Client({
  debugMode: ["info"]
});

const token = "";
  
bot.on("hazir", async () => {  
  client.logger.info("Bot aktif oldu!") 
});

bot.login(token);
