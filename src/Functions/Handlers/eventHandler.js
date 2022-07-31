const fs = require("fs");

module.exports = (client) => {
  client.eventHandler = async () => {
    const eventFolders = fs.readdirSync(`./src/Events`);
    for (folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./src/Events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "client":
          for (file of eventFiles) {
            const event = require(`../../Events/${folder}/${file}`);
            if (event.once) {
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            } else {
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
          }
          break;
      }
    }
  };
};
