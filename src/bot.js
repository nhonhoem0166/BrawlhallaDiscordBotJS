require("dotenv").config();
const { token, prefix } = process.env;
const {
  Client,
  IntentsBitField,
  Collection,
  GatewayIntentBits,
} = require("discord.js");
const fs = require("fs");
const { CLIENT_RENEG_LIMIT } = require("tls");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
  ],
});
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/Functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/Functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./Functions/${folder}/${file}`)(client);
  }
}
client.commandHandler();
client.eventHandler();
client.login(token);
