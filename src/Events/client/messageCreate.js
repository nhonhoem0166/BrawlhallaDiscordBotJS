module.exports = {
  name: "messageCreate",
  async execute(msg, client) {
    console.log(msg.content);
    if(!msg.content.startsWith(client.prefix) || msg.author.bot) return;
    var cmdString = msg.content.substring(0,client.prefix.length);
    const command = client.commands.get(cmdString);
    if (!command) return;
    command.execute(msg, client);
    
  },
};
