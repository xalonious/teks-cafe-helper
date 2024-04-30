const userAccount = require("../../schemas/userAccount");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "with",
    description: "withdraw coins from your bank",
    requiresAccount: true,
    options: [
        {
            name: "amount",
            description: "The amount of money you want to withdraw",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async(client, interaction) => {
            
                    await interaction.deferReply();
            
                    const amount = interaction.options.getString("amount");

                    if(isNaN(amount) && amount !== "all") {
                        return interaction.editReply("hey... that's not a number... you can't withdraw that...");
                    }

                    if(amount == "all") amount = existingUser.bankbalance;
                    amount = parseInt(amount);
        
                    if(amount < 1) return interaction.editReply("hey... you can't withdraw less than 1 coin");
            
                    const existingUser = await userAccount.findOne({ userId: interaction.user.id });
            
                    if(existingUser.bankbalance < amount) return interaction.editReply("hey buddy... you only have " + existingUser.bankbalance + " coins in your bank... you can't withdraw more than you have...");
        
                    await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                        $inc: {
                            walletbalance: amount,
                            bankbalance: -amount
                        }
                    });
        
                    await interaction.editReply(`Successfully withdrew ${amount} coins from your bank`);
    }
}