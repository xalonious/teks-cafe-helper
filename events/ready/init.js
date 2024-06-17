const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");
require("dotenv").configt();

module.exports = async (client) => {
    console.log(`✅  | ${client.user.tag}`)
    
    client.user.setPresence({
        activities: [{ name: "teks cafe", type: ActivityType.Watching }],
      });

    mongoose.connect(process.env.MONGOURL).then(console.log('✅  | Connected to DB'))
}