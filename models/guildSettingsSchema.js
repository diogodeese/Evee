const mongoose = require("mongoose");

const GuildSettings = new mongoose.Schema({
  guild_id: String,
  welcome_channel_id: String,
  goodbye_channel_id: String,
  logs_channel_id: String,
});

module.exports = mongoose.model("GuildSettings", GuildSettings);
