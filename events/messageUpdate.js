const { MessageEmbed, Message } = require("discord.js");
const GuildSettings = require("../models/guildSettingsSchema");

module.exports = {
  name: "messageUpdate",
  once: false,
  /**
   *
   * @param {Message} oldMessage
   * @param {Message} newMessage
   */
  async execute(oldMessage, newMessage) {
    if (oldMessage.author.bot) return;
    if (oldMessage.content === newMessage.content) return;

    const settings = await GuildSettings.findOne({
      guild_id: oldMessage.guild.id,
    });

    if (!GuildSettings && !GuildSettings.logs_channel_id) return;

    const EMBED_MAX_LENGTH = 1950;

    const originalMessage =
      oldMessage.content.slice(0, EMBED_MAX_LENGTH) +
      (oldMessage.content.length > EMBED_MAX_LENGTH ? " ..." : "");
    const editedMessage =
      newMessage.content.slice(0, EMBED_MAX_LENGTH) +
      (newMessage.content.length > EMBED_MAX_LENGTH ? " ..." : "");

    const embedDescription =
      "This [message](" +
      newMessage.url +
      `) was edited by ${newMessage.author} in ${newMessage.channel}.` +
      "\n\n **Original**: \n ``` " +
      originalMessage +
      " ``` \n **Edited**: \n ``` " +
      editedMessage +
      "```";

    const embed = new MessageEmbed()
      .setColor("#ffd500")
      .setTitle("**Message Edited**")
      .setAuthor(
        "Evee",
        "https://cdn.discordapp.com/avatars/775530325572976640/67386d9c99041abd20a890018ac2b497.png"
      )
      .setDescription(embedDescription.slice("0", "4096"))
      .setTimestamp()
      .setFooter(
        "Edited by: " + newMessage.author.tag,
        newMessage.author.displayAvatarURL()
      );

    oldMessage.guild.channels.cache
      .get(settings.logs_channel_id)
      .send({ embeds: [embed] });
  },
};
