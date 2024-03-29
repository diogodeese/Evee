const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const player = require("../../client/player");
const axios = require("axios");

const getLyrics = (title) =>
  new Promise(async (ful, rej) => {
    const url = new URL("https://some-random-api.ml/lyrics");
    url.searchParams.append("title", title);

    try {
      const { data } = await axios.get(url.href);
      ful(data);
    } catch (error) {
      rej(error);
    }
  });

const substring = (length, value) => {
  const replaced = value.replace(/\n/g, "--");
  const regex = `.{1,${length}}`;
  const lines = replaced
    .match(new RegExp(regex, "g"))
    .map((line) => line.replace(/--/g, "\n"));

  return lines;
};

const createResponse = async (title) => {
  try {
    const data = await getLyrics(title);

    const embeds = substring(4096, data.lyrics).map((value, index) => {
      const isFirst = index === 0;

      return new MessageEmbed({
        color: "#0099ff",
        title: isFirst ? `${data.title} - ${data.author}` : null,
        thumbnail: isFirst ? { url: data.thumbnail.genius } : null,
        description: value,
      });
    });

    interaction.reply({ embeds: [embeds] });
  } catch (error) {
    return "I am not able to find lyrics for this song.";
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Display lyrics for the current song or a specific song")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Title of the music")
        .setRequired(false)
    ),

  async execute(interaction) {
    const title = interaction.options.getString("title");
    const sendLyrics = async (songTitle) => {
      try {
        createResponse(songTitle);
      } catch (err) {
        return console.error({ err });
      }
    };

    if (title) return sendLyrics(title);

    const queue = player.getQueue(interaction.guildId);
    if (!queue?.playing) {
      return interaction.reply(
        "There's no music being played and you did not provide a music title."
      );
    }

    return sendLyrics(queue.current.title);
  },
};
