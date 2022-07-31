const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "server",
    admin: true
  },
  async execute(msg, client) {
    // inside a command, event listener, etc.
    const exampleEmbed = new EmbedBuilder()
      .setColor(0xe8484d)
      .setTitle("Brawlhalla SEA 1v1 Queue")
      .setDescription(`Hiển thị những người chơi trong top 1000 SEA đánh rank 1v1 trong {timeRemove} phút gần đây hiện tại có ${boardQueue.length} người`)
      .addFields(
        { name: "Regular field title", value: "Some value here" },
        { name: "\u200B", value: "\u200B" },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true }
      )
      .addFields({
        name: "Inline field title",
        value: "Some value here",
        inline: true,
      })
      .setImage("https://i.imgur.com/AfFp7pu.png")
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });

    await msg.channel.send({ embeds: [exampleEmbed] });
  },
};
