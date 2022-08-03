const { BrawlAPI } = require("../../BrawlAPI.js");
const DBController = require("../../DBController.js");
const Utility = require("../../Utility.js");

module.exports = {
  data: {
    name: "link",
    admin: true,
  },
  async execute(msg, client) {
    var chatArr = msg.content.split(" ");
    var isnum = /^\d+$/.test(chatArr[0]);
    if (!chatArr[0] || !isnum) {
      await msg.reply("Vui lòng nhập ID hoặc tên Brawlhalla của bạn !");
      await msg.channel.send("https://i.imgur.com/K4i2gOV.png");
      return;
    }
    var id = chatArr[0];
    await msg.reply("Đang xử lý thông tin người chơi");
    var notif = await DBController.AddDiscordLink(id, msg.author.id);
    await msg.reply(notif);
  },
};
