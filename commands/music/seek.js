const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");

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

    queue.seek(interaction.options.getString("time"));

    interaction.reply(`Seek to ${interaction.options.getString("time")}!`);
  },
};
