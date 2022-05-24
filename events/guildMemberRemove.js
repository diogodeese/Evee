const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setColor("#ff6666")
      .setTitle("Goodbye!")
      .setAuthor(interaction.user.tag, interaction.user.avatarURL())
      .setDescription(`${interaction.user} has left the server.`)
      .setThumbnail(interaction.user.avatarURL())
      .setTimestamp();

    interaction.guild.channels.cache
      .get("978453505838817291")
      .send({ embeds: [embed] });
  },
};
