const userAccount = require("../../schemas/userAccount");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "dep",
    description: "deposit coins to your bank",
    requiresAccount: true,
    options: [
        {
            name: "amount",
            description: "The amount of money you want to deposit",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async(client, interaction) => {
        
                await interaction.deferReply();

                let amount = interaction.options.getString("amount");

                const existingUser = await userAccount.findOne({ userId: interaction.user.id });

                if((isNaN(amount) && (amount !== "all" && amount !== "max"))) {
                    return interaction.editReply("hey... that's not a number... you can't deposit that...");
                }
                if(amount == "all") amount = existingUser.walletbalance;
                if(amount == "max") {
                    amount = existingUser.bankcapacity - existingUser.bankbalance;
                    if(amount > existingUser.walletbalance) amount = existingUser.walletbalance;
                }


                amount = parseInt(amount);

                if(amount < 1) return interaction.editReply("hey... you can't deposit less than 1 coin");


                if(existingUser.walletbalance < amount) return interaction.editReply("hey buddy... you only have " + existingUser.walletbalance + " coins... you can't deposit more than you have...");

                if(existingUser.bankbalance + amount > existingUser.bankcapacity) {
                    return interaction.editReply(`hey buddy... your bank doesn't have enough space... you can only deposit ${existingUser.bankcapacity - existingUser.bankbalance} coins`);
                }
        
                await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                    $inc: {
                        walletbalance: -amount,
                        bankbalance: amount
                    }
                });
        
                await interaction.editReply(`Successfully deposited ${amount} coins to your bank`);
    }
}