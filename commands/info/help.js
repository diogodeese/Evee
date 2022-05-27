const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows all the commands available"),
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(
        "Command List",
        "https://cdn.discordapp.com/avatars/775530325572976640/67386d9c99041abd20a890018ac2b497.png"
      );

    const commandFolders = fs.readdirSync("./commands");

    let category = "";
    let commands = [];

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      category = folder.charAt(0).toUpperCase() + folder.slice(1);

      switch (category) {
        case "Fun":
          category = ":tada: " + category;
          break;

        case "Info":
          category = ":information_source: " + category;
          break;

        case "Mod":
          category = ":shield: " + category;
          break;

        case "Music":
          category = ":musical_note: " + category;
          break;

        case "Settings":
          category = ":gear: " + category;
          break;

        case "Utility":
          category = ":wrench: " + category;
          break;
      }

      for (const file of commandFiles) {
        commands.push(file.slice(0, -3));
      }

      embed.addFields({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value: commands.map((command) => " `" + command + "`") + " ",
        inline: false,
      });
      commands = [];
    }
    embed.setFooter("Feel free to suggest a command idea!");

    interaction.reply({ embeds: [embed] });
  },
};
