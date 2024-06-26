const userAccount = require("../../schemas/userAccount");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "coinflip",
    description: "Flip a coin to double your money",
    requiresAccount: true,
    givesxp: true,
    cooldown: 30000,
    options: [
        {
            name: "amount",
            description: "The amount of money you want to bet",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "side",
            description: "The side of the coin you want to bet on",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Heads",
                    value: "heads"
                },
                {
                    name: "Tails",
                    value: "tails"
                }
            ],
            required: true,
        }
    ],

    run: async(client, interaction) => {
        
                await interaction.deferReply();
        
                let amount = interaction.options.getString("amount");
                const side = interaction.options.getString("side");

                const existingUser = await userAccount.findOne({ userId: interaction.user.id });

                if(isNaN(amount) && amount !== "all") {
                    interaction.editReply("hey... that's not a number... you can't bet that...");
                    return false;
                }
                if(amount == "all") amount = existingUser.walletbalance;

                amount = parseInt(amount);
    
                if(amount < 1) {
                    interaction.editReply("hey... you can't bet less than 1 coin");
                    return false;
                }
        
                
        
                if(existingUser.walletbalance < amount) {
                    interaction.editReply("hey buddy... you only have " + existingUser.walletbalance + " coins... you can't bet more than you have...");
                    return false;
                }
        
                const result = Math.floor(Math.random() * 2) == 0 ? "heads" : "tails";
        
                if(result == side) {
                    await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                        $inc: {
                            walletbalance: amount
                        }
                    });
        
                    await interaction.editReply(`<a:tekcoin:1234188584664436778> You won! The coin landed on ${result}! You won **__${amount}__** coins!`);
                } else {
                    await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                        $inc: {
                            walletbalance: -amount
                        }
                    });
        
                    await interaction.editReply(`<a:tekcoin:1234188584664436778> You lost! The coin landed on ${result}! You lost **__${amount}__** coins!`);
                }

                return true;
    }
}