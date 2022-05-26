const ReactionRoles = require("../models/reactionRolesSchema");

module.exports = {
  name: "messageReactionAdd",
  async execute(reaction, user) {
    let settings;

    // Query with emoji ID
    settings = await ReactionRoles.findOne({
      guild_id: reaction.message.guild.id,
      message_id: reaction.message.id,
      emoji_id: reaction.emoji.id,
    });

    // Query with emoji name
    if (!reaction.emoji.id) {
      settings = await ReactionRoles.findOne({
        guild_id: reaction.message.guild.id,
        message_id: reaction.message.id,
        emoji: reaction.emoji.name,
      });
    }

    if (!settings) return;

    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (err) {
        console.error("Something went wrong when fetching the message: ", err);
        return;
      }
    }

    if (settings.role_id) {
      const member = reaction.message.guild.members.cache.get(user.id);
      member.roles.add(settings.role_id);
    }
  },
};
