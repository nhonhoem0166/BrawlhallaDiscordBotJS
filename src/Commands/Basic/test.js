const {BrawlAPI} = require("../../BrawlAPI.js");

module.exports = {
    data: {
      name: "t",
    },
    async execute(msg, client) {
       var  test =  await BrawlAPI.GetPlayerStatsByID(31682773);
       console.log(test.name);
    }
  };
  