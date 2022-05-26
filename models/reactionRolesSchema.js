const mongoose = require("mongoose");

const ReactionRolesSchema = new mongoose.Schema({
  guild_id: String,
  channel_id: String,
  message_id: String,
  role_id: String,
  emoji: String,
});

module.exports = mongoose.model("ReactionRoles", ReactionRolesSchema);
