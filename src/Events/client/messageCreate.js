require("dotenv").config();
module.exports = {
  name: "messageCreate",
  async execute(msg, client) {
    if (!msg.content.startsWith(process.env.prefix) || msg.author.bot) return;
    var cmdString = msg.content.substring(
      process.env.prefix.length,
      msg.content.length
    ).split(" ")[0];
    if(!cmdString) return;
    const command = client.commands.get(cmdString);
    if (!command) return;
    if (command.admin) {
      if (command.admin != process.env.admin) return;
    }
    msg.content = msg.content.substring(process.env.prefix.length+ cmdString.length + 1 ,msg.content.length);
    command.execute(msg, client);
  },
};
