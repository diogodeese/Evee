require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v8");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,
  async execute(client, commands) {
    console.log("Evee is online");

    client.use;
    const CLIENT_ID = client.user.id;

    // Bot Description
    const serverCount = client.guilds.cache.size;
    const userCount = client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    );

    const activities = [
      serverCount + " servers! |  /help",
      userCount + " users! |  /help",
    ];

    setInterval(() => {
      const status = activities[Math.floor(Math.random() * activities.length)];
      client.user.setPresence({
        activities: [{ name: `${status}`, type: "WATCHING" }],
      });
    }, 15000);

    const rest = new REST({
      version: "9",
    }).setToken(process.env.TOKEN);

    (async () => {
      try {
        if (process.env.ENV === "production") {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
          });
          console.log("Commands Registered Globally");
        } else {
          await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
            {
              body: commands,
            }
          );
          console.log("Commands Registered Locally");
        }
      } catch (err) {
        if (err) {
          console.error(err);
        }
      }
    })();

    // MongoDB Connection
    await mongoose
      .connect(process.env.MONGO_URI || "", {
        keepAlive: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
