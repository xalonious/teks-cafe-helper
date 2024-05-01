const userAccount = require('../../schemas/userAccount');
const items = require('../../utils/getItems');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "inv",
    description: "Displays your inventory",

    run: async(client, interaction) => {
        await interaction.deferReply();

        const existingUser = await userAccount.findOne({ userId: interaction.user.id });

        if (!existingUser.inventory.length) {
            return await interaction.editReply("hey buddy... you don't have anything in your inventory... go buy some shit first");
        }

        const inventoryEmbed = new EmbedBuilder()
        .setTitle("Inventory")
        .setColor("Blurple")
        .setDescription(
            existingUser.inventory.map((item) => {
                const itemData = items.find(i => i.name === item.itemName);
                return `${itemData.emoji} **${item.itemName}** - ${item.quantity}`
            }).join("\n")
        )
        .setThumbnail(client.user.displayAvatarURL())

        await interaction.editReply({ embeds: [inventoryEmbed] });
    }
}