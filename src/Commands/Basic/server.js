module.exports = {
  data: {
    name: "server",
  },
  async execute(msg, client) {
      await msg.channel.send("pong!");
      
  }
};
