const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions, Guild } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Ubans a user from the server")
    .addUserOption((option) =>
      option
        .setName("userid")
        .setDescription("The user to unban")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userId = interaction.options.getUser("userid");
    const member = interaction.member;
    const guild = interaction.guild;

    if (!member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) {
      interaction.reply("You don't have permission to unban members.");
      return;
    }

    if (userId === interaction.client.user.id) {
      interaction.reply("You can't unban me.");
      return;
    }

    if (userId === member.id) {
      interaction.reply("You can't unban yourself.");
      return;
    }

    guild.members
      .unban(userId)
      .then((user) => {
        interaction.reply(`Unbanned ${user.tag}!`);
      })
      .catch((err) => {
        interaction.reply(
          `Something went wrong when unbanning the user with this id ${userId}`
        );
      });
    console.error(err);
  },
};
