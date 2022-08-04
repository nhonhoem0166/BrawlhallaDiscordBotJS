const { put } = require("request");
const { BrawlAPI } = require("../../BrawlAPI.js");
const DBController = require("../../DBController.js");
const Utility = require("../../Utility.js");

async function PrivateHandler(msg, isPrivate) {
  var r = await DBController.UpdateLink(msg.author.id, {
    $set: { private: isPrivate },
  });
  if (r.matchedCount == 0) {
    await msg.reply("Bạn chưa liên kết tài khoản Brawlhalla");
  } else {
    await msg.reply(
      `Chế độ liên kết đã được chuyển sang: **${
        isPrivate ? "riêng tư" : "công khai"
      }**`
    );
  }
}
async function BadFormat(msg) {
  await msg.reply("Vui lòng nhập ID hoặc tên Brawlhalla của bạn ! \nhttps://i.imgur.com/K4i2gOV.png");
  //await msg.channel.send("https://i.imgur.com/K4i2gOV.png");
}

module.exports = {
  data: {
    name: "link",
    admin: true,
  },
  async execute(msg, client) {
    var args = msg.content.split(" ");
    var cmd = args[0].trimEnd().trimStart().toLowerCase();
    if (cmd == "private") {
      await PrivateHandler(msg, true);
    } else if (cmd == "public") {
      await PrivateHandler(msg, false);
    } else if (/^\d+$/.test(cmd)) {
      //link by id
      var notif = await DBController.AddLink(cmd, msg.author.id);
      await msg.reply(notif);
    } else if (cmd != "") {
      //todo handler link by name
      
    } else {
      await BadFormat(msg);
    }
  },
};
