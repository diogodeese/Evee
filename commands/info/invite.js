const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Replies with the invite link"),
  async execute(interaction) {
    const inviteLink =
      "https://discord.com/api/oauth2/authorize?client_id=775530325572976640&permissions=8&scope=bot";

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(
        "Evee",
        "https://cdn.discordapp.com/avatars/775530325572976640/67386d9c99041abd20a890018ac2b497.png"
      )
      .setTitle("Invite Link")
      .setDescription(
        `👇 Use this link to invite me to your server 👇\n\n${inviteLink}`
      );
    await interaction.reply({ embeds: [embed] });
  },
};
