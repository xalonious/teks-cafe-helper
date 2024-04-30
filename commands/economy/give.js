const userAccount = require("../../schemas/userAccount");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "give",
    description: "Give someone some money",
    requiresAccount: true,
    options: [
        {
            name: "user",
            description: "The user you want to give money to",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "amount",
            description: "The amount of money you want to give",
            type: ApplicationCommandOptionType.Integer,
            required: true
        }
    ],

    run: async(client, interaction) => {
    
            await interaction.deferReply();
    
            const user = interaction.options.getUser("user");
            const amount = interaction.options.getInteger("amount");

            if(user.id == interaction.user.id) return interaction.editReply("hey... you can't give yourself money... that's not how it works");
    
    

            if(amount < 1) return interaction.editReply("hey... you can't give less than 1 coin");
    
            const existingUser = await userAccount.findOne({ userId: interaction.user.id });
            const targetUser = await userAccount.findOne({ userId: user.id });
    
            if(!targetUser) return interaction.editReply("hey... they don't have an account yet... tell them to create one using `/createaccount`");
    
            if(existingUser.walletbalance < amount) return interaction.editReply("hey buddy... you only have " + existingUser.walletbalance + " coins... you can't give more than you have... smh");
    
            await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                $inc: {
                    walletbalance: -amount
                }
            });
    
            await userAccount.findOneAndUpdate({ userId: user.id }, {
                $inc: {
                    walletbalance: amount
                }
            });
    
            await interaction.editReply(`Successfully gave ${amount} coins to ${user.username}`);
    }
}