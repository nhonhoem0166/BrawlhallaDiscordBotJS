const {BrawlAPI} = require("../../BrawlAPI.js");

module.exports = {
    data: {
      name: "test",
    },
    async execute(message, client) {
        BrawlAPI.GetLeaderBoard(1);
    }
  };
  