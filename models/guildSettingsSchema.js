const mongoose = require("mongoose");

const GuildSettingsSchema = new mongoose.Schema({
  guild_id: String,
  welcome_channel_id: String,
  goodbye_channel_id: String,
  logs_channel_id: String,
  default_role_id: String,
});

module.exports = mongoose.model("GuildSettings", GuildSettingsSchema);
