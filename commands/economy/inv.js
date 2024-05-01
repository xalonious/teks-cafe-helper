const userAccount = require('../../schemas/userAccount');
const items = require('../../utils/getItems');
const { EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
module.exports = {
    name: "inv",
    description: "Displays your inventory",
    requiresAccount: true,
    options: [
        {
            name: "user",
            description: "The user you want to view the inventory of",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],

    run: async(client, interaction) => {
        await interaction.deferReply();

        const user = interaction.options.getUser("user") || interaction.user;

        const existingUser = await userAccount.findOne({ userId: user.id });

        let replyString;

        if(!existingUser) {
            return interaction.editReply("hey... they don't have an account yet... tell them to create one using `/createaccount`");
        }

        if(user.id !== interaction.user.id) {
            replyString = "hey... they don't have anything in their inventory... they should go buy some stuff first";
        } else {
            replyString = "hey buddy... you don't have anything in your inventory... go buy some shit first"
        }

        if (!existingUser.inventory.length) {
            return await interaction.editReply(replyString);
        }

        const inventoryEmbed = new EmbedBuilder()
        .setTitle(`${user.username}'s inventory`)
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