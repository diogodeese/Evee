const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");
const fluentFfmpeg = require("fluent-ffmpeg");
const ytdl = require("ytdl-core");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Moves to the specific time")
    .addIntegerOption((option) =>
      option.setName("time").setDescription("Time to seek").setRequired(true)
    ),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);
    if (!queue?.playing)
      return interaction.reply("There's no music being played");

    let song = ytdl(queue.current.url, { quality: "highestaudio" });

    let editedSong = fluentFfmpeg({ source: song })
      .toFormat("mp3")
      .setStartTime(interaction.options.getInteger("time"));
    queue.play(editedSong);

    interaction.reply(`Seek to ${interaction.options.getInteger("time")}!`);
  },
};
