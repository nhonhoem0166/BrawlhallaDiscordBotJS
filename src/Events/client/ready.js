const rankQueue = require("../../Commands/Brawlhalla/RankQueue");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`ready!! ${client.user.tag}`);
    var channel = client.channels.cache.get("1003620258260713482");
    var messages =  await channel.messages.fetch({ limit: 99 });
    await channel.bulkDelete(messages);
    rankQueue.RankQueue(channel);
  },
};
