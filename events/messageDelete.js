const { MessageEmbed, Message } = require("discord.js");
const GuildSettings = require("../models/guildSettingsSchema");

module.exports = {
  name: "messageDelete",
  once: false,
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    if (message.author.bot) return;

    const settings = await GuildSettings.findOne({
      guild_id: message.guild.id,
    });

    if (!GuildSettings && !GuildSettings.logs_channel_id) return;

    const embedDescription =
      `A message sent by ${message.author} was deleted.` +
      "\n\n **Deleted Message**: \n ``` " +
      `${message.content ? message.content : "None"}` +
      "```";

    const embed = new MessageEmbed()
      .setColor("#ff0000")
      .setTitle("**Message Deleted**")
      .setAuthor(
        "Evee",
        "https://cdn.discordapp.com/avatars/775530325572976640/67386d9c99041abd20a890018ac2b497.png"
      )
      .setDescription(embedDescription.slice("0", "4096"))
      .setTimestamp()
      .setFooter(
        "Sent by: " + message.author.tag,
        message.author.displayAvatarURL()
      );

    if (message.attachments.size >= 1) {
      embed.addField(
        "\n Attachments: ",
        `${message.attachments.map((attachment) => attachment.url)}`,
        true
      );
    }

    message.guild.channels.cache
      .get(settings.logs_channel_id)
      .send({ embeds: [embed] });
  },
};
