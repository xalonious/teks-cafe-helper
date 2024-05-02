const userAccount = require("../../schemas/userAccount");
const items = require("../../utils/getItems");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "sell",
    description: "Sell an item from your inventory",
    options: [
        {
            name: "item",
            description: "The item you want to sell",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "quantity",
            description: "The amount of the item you want to sell (default is 1)",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],

    run: async(client, interaction) => {
        await interaction.deferReply();

        const itemName = interaction.options.getString("item");
        let quantity = interaction.options.getString("quantity") || 1;

        if(isNaN(quantity) && quantity !== "all") return interaction.editReply("how many do you want to sell?? give me a valid number");



        const item = items.find(i => i.name.toLowerCase() === itemName.toLowerCase());


        
        if(quantity < 1) return interaction.editReply("You can't sell less than 1 item");


        if(!item) return interaction.editReply("Thats not a valid item.. stop trying to scam me");

        if(!item.sellprice) return interaction.editReply("That item is not sellable... sucks to suck");

        const user = await userAccount.findOne({ userId: interaction.user.id });


        const userItem = user.inventory.find(i => i.itemName.toLowerCase() === itemName.toLowerCase());

        if(!userItem) return interaction.editReply("You don't have that item in your inventory");

        if(quantity === "all") quantity = userItem.quantity;

        quantity = parseInt(quantity);



        if(userItem.quantity < quantity) return interaction.editReply(`You only have ${userItem.quantity} of those... you cant sell more than you have`);

        const sellPrice = item.sellprice * quantity;

        user.walletbalance += sellPrice;

        if(userItem.quantity === quantity) {
            user.inventory = user.inventory.filter(i => i.itemName.toLowerCase() !== itemName.toLowerCase());
        } else {
            userItem.quantity -= quantity;
        }

        await user.save();

        await interaction.editReply(`You sold ${quantity} ${item.name}(s) for <a:tekcoin:1234188584664436778> ${sellPrice} coins`);
    }
}