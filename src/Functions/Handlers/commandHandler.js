const fs = require("fs");
module.exports = (client) => {
  client.commandHandler = async () => {
    const commandFolders = fs.readdirSync(`./src/Commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/Commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../Commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        //commandArray.push(command.data.toJson());
      }
    }
  };
};
