const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a user from the server")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for kicking")
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const member = interaction.member;
    const guild = interaction.guild;

    if (!member.permissions.has([Permissions.FLAGS.KICK_MEMBERS])) {
      interaction.reply("You don't have permission to kick members.");
      return;
    }

    if (user.id === guild.ownerID) {
      interaction.reply("You can't kick the owner of the server.");
      return;
    }

    if (user.id === interaction.client.user.id) {
      interaction.reply("You can't kick me.");
      return;
    }

    if (user.id === member.id) {
      interaction.reply("You can't kick yourself.");
      return;
    }

    try {
      interaction.options.getMember("user").kick(reason);
      if (!reason) {
        interaction.reply(`Kicked ${user.tag}!`);
      } else {
        interaction.reply(`Kicked ${user.tag}! \nReason: ${reason}`);
      }
    } catch (err) {
      interaction.reply(`Something went wrong when kicking ${user.tag}`);
      console.error(err);
    }
  },
};
