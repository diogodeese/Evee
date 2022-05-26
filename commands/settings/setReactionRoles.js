const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const ReactionRoles = require("../../models/reactionRolesSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-reaction-roles")
    .setDescription("Will add a reaction role to the message!")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel where your reaction role message is located.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message-id")
        .setDescription("Id of the message where users can claim their roles")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("Emoji to react to get the role")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Role users will get by reacting")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])
    ) {
      return interaction.reply({
        content: "You do not have the permissions to use this command.",
        ephemeral: true,
      });
    }

    /*// Removing all reactions
    const channel = interaction.options.getChannel("channel");
    const message = await channel.messages.fetch(
      interaction.options.getString("message-id")
    );
    message.reactions.removeAll();*/

    ReactionRoles.findOne(
      { guild_id: interaction.guild.id },
      (err, settings) => {
        if (err) {
          console.error(err);
          return interaction.reply({
            content: "An error occurred while executing that command.",
            ephemeral: true,
          });
        }

        if (!settings) {
          settings = new ReactionRoles({
            guild_id: interaction.guild.id,
            channel_id: interaction.options.getChannel("channel").id,
            message_id: interaction.options.getString("message-id"),
            role_id: interaction.options.getRole("role").id,
            emoji: interaction.options.getString("emoji"),
          });
        } else {
          settings.channel_id = interaction.options.getChannel("channel").id;
          settings.message_id = interaction.options.getString("message-id");
          settings.role_id = interaction.options.getRole("role").id;
          settings.emoji = interaction.options.getString("emoji");
        }

        settings.save(async (err) => {
          if (err) {
            console.error(err);
            return interaction.reply({
              content: "An error occurred while executing that command.",
              ephemeral: true,
            });
          }

          // Creating a reaction role
          const channel = interaction.options.getChannel("channel");
          const message = await channel.messages.fetch(
            interaction.options.getString("message-id")
          );
          message.react(interaction.options.getString("emoji"));

          interaction.reply(
            `Users that react with ${interaction.options.getString(
              "emoji"
            )} will get the role ${interaction.options.getRole("role")}!`
          );
        });
      }
    );
  },
};
