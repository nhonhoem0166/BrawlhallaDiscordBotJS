const { BrawlAPI } = require("../../BrawlAPI.js");
const Utility = require("../../Utility.js");

module.exports = {
  data: {
    name: "t",
    admin: true,
  },
  async execute(msg, client) {

    var test = await BrawlAPI.GetPlayerStatsByID(31682773);
    console.log(test.name);
  },
};
