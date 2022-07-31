const {BrawlAPI} = require("../../BrawlAPI.js");

module.exports = {
    data: {
      name: "t",
    },
    async execute(msg, client) {
       var  test =  await BrawlAPI.GetLeaderBoard("1v1","sea",1);
    }
  };
  