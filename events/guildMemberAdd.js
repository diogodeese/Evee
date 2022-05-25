const { MessageEmbed } = require("discord.js");
const GuildSettings = require("../models/guildSettingsSchema");

module.exports = {
  name: "guildMemberAdd",
  async execute(interaction) {
    const settings = await GuildSettings.findOne({
      guild_id: interaction.guild.id,
    });

    if (!GuildSettings && !GuildSettings.welcome_channel_id) return;

    const greets = ["has joined the server!"];
    const random = Math.floor(Math.random() * greets.length);

    const embed = new MessageEmbed()
      .setColor("#8cff66")
      .setTitle("New Member!")
      .setAuthor(interaction.user.tag, interaction.user.avatarURL())
      .setDescription(
        `${interaction.user} ${greets[random]}

        Be nice and enjoy your stay!`
      )
      .setThumbnail(interaction.user.avatarURL())
      .setTimestamp();

    interaction.guild.channels.cache
      .get(settings.welcome_channel_id)
      .send({ embeds: [embed] });
  },
};
