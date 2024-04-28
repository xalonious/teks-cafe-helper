const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const userAccount = require("../../schemas/userAccount");

module.exports = {
    name: "bal",
    description: "Check your or someone else's balance",
    requiresAccount: true,
    options: [
        {
            name: "user",
            description: "The user you want to check the balance of",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],

    run: async(client, interaction) => {

        await interaction.deferReply();

        const user = interaction.options.getUser("user") || interaction.user;

        const existingUser = await userAccount.findOne({ userId: user.id });

        if(!existingUser) return interaction.editReply("hey... they don't have an account yet... tell them to create one using `/createaccount`");


        const balEmbed = new EmbedBuilder()
        .setTitle(`${user.username}'s balance`)
        .setDescription(`<a:tekcoin:1234188584664436778> | Balance: ${existingUser.balance}`)
        .setColor("Random")
        .setThumbnail("https://media1.tenor.com/m/cAbmue3GsqwAAAAd/horse-sweeping.gif", { dynamic: true })
        .setFooter({ text: "you poor lmao"})

        
        await interaction.editReply({ embeds: [balEmbed] });
    }

    

}