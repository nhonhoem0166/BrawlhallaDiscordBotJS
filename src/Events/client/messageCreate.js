module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const command = client.commands.get(message.content);
    if (!command) return;
    command.execute(message, client);
    console.log(message.content);
  },
};
