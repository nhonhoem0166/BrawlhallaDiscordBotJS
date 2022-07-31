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
const messageCreate = require("./Events/client/messageCreate");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
  ],
});
client.on("messageCreate",async (msg)=>{
    msg.channel.send()
})
