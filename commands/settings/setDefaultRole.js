const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const GuildSettings = require("../../models/guildSettingsSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-default-role")
    .setDescription("Will apply this role to all new members!")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Role that will be applied to all new members.")
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

    GuildSettings.findOne(
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
          settings = new GuildSettings({
            guild_id: interaction.guild.id,
            default_role_id: interaction.options.getRole("role").id,
          });
        } else {
          settings.default_role_id = interaction.options.getRole("role").id;
        }

        settings.save((err) => {
          if (err) {
            console.error(err);
            return interaction.reply({
              content: "An error occurred while executing that command.",
              ephemeral: true,
            });
          }

          interaction.reply(
            `Default role has been set to ${interaction.options.getRole(
              "role"
            )}!`
          );
        });
      }
    );
  },
};
