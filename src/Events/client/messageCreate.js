require("dotenv").config();
module.exports = {
  name: "messageCreate",
  async execute(msg, client) {
    console.log(msg.content);
    if(!msg.content.startsWith(process.env.prefix) || msg.author.bot) return;
    var cmdString = msg.content.substring(process.env.prefix.length, msg.content.length);
    const command = client.commands.get(cmdString);
    if (!command) return;
    command.execute(msg, client);
    
  },
};
