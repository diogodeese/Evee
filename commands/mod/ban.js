const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user from the server")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for banning")
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const member = interaction.member;
    const guild = interaction.guild;

    if (!member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) {
      interaction.reply("You don't have permission to ban members.");
      return;
    }

    if (user.id === guild.ownerID) {
      interaction.reply("You can't ban the owner of the server.");
      return;
    }

    if (user.id === interaction.client.user.id) {
      interaction.reply("You can't ban me.");
      return;
    }

    if (user.id === member.id) {
      interaction.reply("You can't ban yourself.");
      return;
    }

    try {
      interaction.options.getMember("user").ban({ reason });
      if (!reason) {
        interaction.reply(`Banned ${user.tag}!`);
      } else {
        interaction.reply(`Banned ${user.tag}! \nReason: ${reason}`);
      }
    } catch (err) {
      interaction.reply(`Something went wrong when banning ${user.tag}`);
      console.error(err);
    }
  },
};
