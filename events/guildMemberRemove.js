const { MessageEmbed } = require("discord.js");
const GuildSettings = require("../models/guildSettingsSchema");

module.exports = {
  name: "guildMemberRemove",
  async execute(interaction) {
    const settings = await GuildSettings.findOne({
      guild_id: interaction.guild.id,
    });

    if (!GuildSettings && !GuildSettings.goodbye_channel_id) return;

    const embed = new MessageEmbed()
      .setColor("#ff6666")
      .setTitle("Goodbye!")
      .setAuthor(interaction.user.tag, interaction.user.avatarURL())
      .setDescription(`${interaction.user} has left the server.`)
      .setThumbnail(interaction.user.avatarURL())
      .setTimestamp();

    interaction.guild.channels.cache
      .get(settings.goodbye_channel_id)
      .send({ embeds: [embed] });
  },
};
