const { BrawlAPI } = require("../../BrawlAPI.js");
const DBController = require("../../DBController.js");
const Utility = require("../../Utility.js");

module.exports = {
  data: {
    name: "unlink",
    admin: true,
  },
  async execute(msg, client) {
    if(!msg.content== "")
    {
        return;
    }
    await msg.reply("Đang xử lý thông tin");
    console.log(msg.author.id);
    var notif = await DBController.DeleteDiscordLink(msg.author.id);
    await msg.reply(notif);
  },
};
