const userAccount = require("../../schemas/userAccount");
const shopItems = require("../../utils/getItems");
const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
    name: "buy",
    description: "Buy an item from the shop",
    requiresAccount: true,
    options: [
        {
            name: "item",
            description: "The name of the item you want to buy",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "quantity",
            description: "The quantity of the item you want to buy (default is 1)",
            type: ApplicationCommandOptionType.Integer,
            required: false
        }
    ],

    run: async(client, interaction) => {
        await interaction.deferReply();

        const item = interaction.options.getString("item");
        const quantity = interaction.options.getInteger("quantity") || 1;

        const existingUser = await userAccount.findOne({ userId: interaction.user.id });

        const shopItem = shopItems.find(i => i.name.toLowerCase() === item.toLowerCase() && i.inShop);

        if (!shopItem) {
            return interaction.editReply("hey... that item doesn't exist in the shop");
        }

        if (existingUser.walletbalance < shopItem.price * quantity) {
            return interaction.editReply("hey... you don't have enough coins to buy this...");
        }

        const inventoryItem = existingUser.inventory.find(i => i.itemName === shopItem.name);

        if (inventoryItem) {
            inventoryItem.quantity += quantity;
        } else {
            existingUser.inventory.push({ itemName: shopItem.name, quantity: quantity });
        }

        existingUser.walletbalance -= shopItem.price * quantity;

        await existingUser.save();

        await interaction.editReply(`You have successfully bought ${quantity} ${shopItem.name}(s) for ${shopItem.price * quantity} coins`);
    }
}