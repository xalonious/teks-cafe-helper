const userAccount = require("../../schemas/userAccount");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "lb",
    description: "Displays the economy leaderboard",

    run: async(client, interaction) => {
            
            await interaction.deferReply();
    
            const allUsers = await userAccount.find({}).sort({ walletbalance: -1 }).limit(10);
    
            const leaderboardEmbed = new EmbedBuilder()
            .setTitle("Economy Leaderboard Top 10")
            .setColor("Blurple")
            .setDescription(
                allUsers.map((user, index) => {
                    return `**${index + 1}.** <@${user.userId}> - <a:tekcoin:1234188584664436778> ${user.balance}`
                }).join("\n")
            )
            .setThumbnail(client.user.displayAvatarURL())
    
            await interaction.editReply({ embeds: [leaderboardEmbed] });
    }
}