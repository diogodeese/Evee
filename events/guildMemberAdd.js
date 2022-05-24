const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(interaction) {
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
      .get("890230553922633799")
      .send({ embeds: [embed] });
  },
};
