const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Repeats a message")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Message to be repeated by Evee")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply(interaction.options.getString("message"));
  },
};
