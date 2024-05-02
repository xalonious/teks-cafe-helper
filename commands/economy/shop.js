const { EmbedBuilder } = require("discord.js");
const shopItems = require("../../utils/getItems");

module.exports = {
    name: "shop",
    description: "Displays the shop",
    run: async(client, interaction) => {
        await interaction.deferReply();

        const shopEmbed = new EmbedBuilder()
        .setTitle("Shop")
        .setColor("Blurple")
        .setDescription(
            shopItems
                .filter((item) => item.inShop === true)
                .map((item) => {
                    return `${item.emoji} **${item.name}**\n${item.description} - <a:tekcoin:1234188584664436778> ${item.buyprice}`
                })
                .join("\n\n")
        )
        .setThumbnail(client.user.displayAvatarURL())

        await interaction.editReply({ embeds: [shopEmbed] });
    }
}