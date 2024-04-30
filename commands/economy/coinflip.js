const userAccount = require("../../schemas/userAccount");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "coinflip",
    description: "Flip a coin to double your money",
    requiresAccount: true,
    options: [
        {
            name: "amount",
            description: "The amount of money you want to bet",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async(client, interaction) => {
        
                await interaction.deferReply();
        
                let amount = interaction.options.getString("amount");

                const existingUser = await userAccount.findOne({ userId: interaction.user.id });

                if(isNaN(amount) && amount !== "all") return interaction.editReply("hey... that's not a number... you can't bet that...");
                if(amount == "all") amount = existingUser.walletbalance;

                amount = parseInt(amount);
    
                if(amount < 1) return interaction.editReply("hey... you can't bet less than 1 coin");
        
                
        
                if(existingUser.walletbalance < amount) return interaction.editReply("hey buddy... you only have " + existingUser.balance + " coins... you can't bet more than you have...");
        
                const result = Math.floor(Math.random() * 2) == 0 ? "heads" : "tails";
        
                if(result == "heads") {
                    await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                        $inc: {
                            walletbalance: amount
                        }
                    });
        
                    await interaction.editReply(`<a:tekcoin:1234188584664436778> You won! The coin landed on heads! You won **__${amount}__** coins!`);
                } else {
                    await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                        $inc: {
                            walletbalance: -amount
                        }
                    });
        
                    await interaction.editReply(`<a:tekcoin:1234188584664436778> You lost! The coin landed on tails! You lost **__${amount}__** coins!`);
                }
    }
}