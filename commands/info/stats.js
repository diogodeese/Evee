const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("It shows the bot stats at the moment"),
  async execute(interaction) {
    const serverCount = interaction.client.guilds.cache.size;
    const channelCount = interaction.client.channels.cache.size;
    const userCount = interaction.client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    );

    const ToTalSeconds = interaction.client.uptime / 1000;
    const Days = Math.floor(ToTalSeconds / 86400);
    const Hours = Math.floor(ToTalSeconds / 3600);
    const Minutes = Math.floor(ToTalSeconds / 60);
    const Seconds = Math.floor(ToTalSeconds % 60);

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(
        "Evee",
        "https://cdn.discordapp.com/avatars/775530325572976640/67386d9c99041abd20a890018ac2b497.png"
      )
      .setTitle("Statistics")
      .addFields(
        {
          name: "Servers",
          value: serverCount.toString(),
          inline: true,
        },
        {
          name: "Channels",
          value: channelCount.toString(),
          inline: true,
        },
        {
          name: "Users",
          value: userCount.toString(),
          inline: true,
        },
        {
          name: "Uptime",
          value: `${Days} Days, ${Hours} Hours, ${Minutes} Minutes, ${Seconds} Seconds`,
          inline: false,
        }
      );

    interaction.reply({ embeds: [embed] });
  },
};
