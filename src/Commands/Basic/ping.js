module.exports = {
  data: {
    name: "ping",
  },
  async execute(msg, client) {
      await msg.channel.send("pong!");
      
  }
};
