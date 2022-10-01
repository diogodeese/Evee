const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");
const fluentFfmpeg = require("fluent-ffmpeg");

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

    let editedSong = fluentFfmpeg({ source: queue.current })
      .toFormat("mp3")
      .setStartTime(interaction.options.getInteger("time"));
    queue.play(editedSong);

    interaction.reply(`Seek to ${interaction.options.getInteger("time")}!`);
  },
};
