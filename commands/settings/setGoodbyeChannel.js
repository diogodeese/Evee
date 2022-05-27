const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const GuildSettings = require("../../models/guildSettingsSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-goodbye-channel")
    .setDescription("Clear previous messages")
    .addChannelOption((option) =>
      option
        .setName("goodbye")
        .setDescription("Channel where your goodbye messages will be logged")
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
            goodbye_channel_id: interaction.options.getChannel("goodbye").id,
          });
        } else {
          settings.goodbye_channel_id =
            interaction.options.getChannel("goodbye").id;
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
            `Goodbye channel has been set to ${interaction.options.getChannel(
              "goodbye"
            )}!`
          );
        });
      }
    );
  },
};
