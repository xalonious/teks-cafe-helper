const userAccount = require("../../schemas/userAccount");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "lb",
    description: "Displays the economy leaderboard",

    run: async(client, interaction) => {
            
            await interaction.deferReply();
    
            const allUsers = await userAccount.aggregate([
                {
                    $addFields: {
                        totalbalance: { $add: ["$walletbalance", "$bankbalance"] }
                    }
                },
                {
                    $sort: { totalbalance: -1 }
                },
                {
                    $limit: 10
                }
            ]);
    
            const leaderboardEmbed = new EmbedBuilder()
            .setTitle("Economy Leaderboard Top 10")
            .setColor("Blurple")
            .setDescription(
                allUsers.map((user, index) => {
                    return `**${index + 1}.** <@${user.userId}> - <a:tekcoin:1234188584664436778> ${user.totalbalance} | <:wallet:1234992701603315762> ${user.walletbalance} :bank: ${user.bankbalance}`
                }).join("\n")
            )
            .setThumbnail(client.user.displayAvatarURL())
    
            await interaction.editReply({ embeds: [leaderboardEmbed] });
    }
}
