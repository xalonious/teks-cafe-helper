const userAccount = require("../../schemas/userAccount");
const items = require("../../utils/getItems");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "item",
    description: "Gives you info about an item",
    options: [
        {
            name: "item",
            description: "The item you want to get info for",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async(client, interaction) => {
        
        await interaction.deferReply();

        const itemName = interaction.options.getString("item");

        const item = items.find(i => i.name.toLowerCase() === itemName.toLowerCase());

        if(!item) return interaction.editReply("That item doesn't exist!");

        const user = await userAccount.findOne({ userId: interaction.user.id });

        const userItem = user.inventory.find(i => i.itemName.toLowerCase() === itemName.toLowerCase());

        const amount = userItem ? userItem.quantity : 0;

        const itemEmbed = new EmbedBuilder()
        .setTitle(`${item.emoji} ${item.name} (you own ${amount})`)
        .setDescription(item.description)
        .addFields(
            { name: "Buy Price", value: item.buyprice ? `<a:tekcoin:1234188584664436778> ${item.buyprice}` : "Not buyable"},
            { name: "Sell Price", value: item.sellprice ? `<a:tekcoin:1234188584664436778> ${item.sellprice}` : "Not sellable"})
        .setColor("Random")
        .setThumbnail(client.user.displayAvatarURL())

        await interaction.editReply({ embeds: [itemEmbed] });
    }
}