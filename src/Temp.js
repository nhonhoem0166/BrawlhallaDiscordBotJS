
const {
  Client,
  IntentsBitField,
  Collection,
  GatewayIntentBits,
} = require("discord.js");
const DBController = require("./DBController");

const client = new Client();
client.on("messageCreate",(msg) =>
{
  
  var chatArr = msg.content.split(" ");
  var isnum = /^\d+$/.test(chatArr[0]);
  if(!chatArr[0] || !isnum)
  {
    await msg.reply("Vui lòng nhập ID hoặc tên Brawlhalla của bạn !");
    await msg.channel.send("https://i.imgur.com/K4i2gOV.png");
    return;
  }
  var id = chatArr[0];
  await msg.reply("Đang xử lý thông tin người chơi")
  var msg = await DBController.AddLink(id,msg.author.id);

})