const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Display the song queue"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);
    if (!queue?.playing)
      return interaction.reply("No songs are currently playing.");

    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((track, index) => {
      return `${index + 1}. [**${track.title}**](${track.url}) - ${
        track.requestedBy.tag
      }`;
    });

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Music Queue")
      .addFields({
        name: "Now Playing",
        value: `[**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
        inline: true,
      })
      .setDescription(
        `${tracks.join("\n")}${
          queue.tracks.length > tracks.length &&
          `\n\n${
            queue.tracks.length - tracks.length === 1
              ? `${queue.tracks.length - tracks.length} more track`
              : `${queue.tracks.length - tracks.length} more tracks`
          }`
        }`
      )
      .setAuthor(
        "Evee",
        "https://cdn.discordapp.com/avatars/775530325572976640/67386d9c99041abd20a890018ac2b497.png"
      );

    return interaction.Reply({ content: "", embeds: [embed] });
  },
};
