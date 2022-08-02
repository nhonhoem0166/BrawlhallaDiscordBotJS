const API = require("../../API.js");
const { BrawlAPI } = require("../../BrawlAPI.js");
require("../../Utility");
module.exports = {
  data: {
    name: "tr",
    admin: true,
  },
  async execute(msg, client) {
    var test =  await API.Translate(msg.content);
    await msg.reply(test);
  },
};
