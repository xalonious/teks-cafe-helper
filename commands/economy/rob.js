const userAccount = require("../../schemas/userAccount");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "rob",
    description: "Try to rob someone for some coins",
    requiresAccount: true,
    cooldown: 120000,
    options: [
        {
            name: "user",
            description: "The user you want to rob",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    
    run: async(client, interaction) => {

        await interaction.deferReply();

        const user = interaction.options.getUser("user");

        if(user.id == interaction.user.id) {
            interaction.editReply("hey... you can't rob yourself... that's not how it works");
            return false;
        }

        const existingUser = await userAccount.findOne({ userId: interaction.user.id });
        const targetUser = await userAccount.findOne({ userId: user.id });

        if(!targetUser) {
            interaction.editReply("hey... they don't have an account yet... tell them to create one using `/createaccount`");
            return false;
        
        }

        if(existingUser.walletbalance < 250) {
            interaction.editReply("hey... you need at least 250 coins to rob someone...");
            return false;
        }

        if(targetUser.walletbalance < 500) {
            interaction.editReply("hey... they need at least 500 coins for you to rob them...");
            return false;
        }

        const result = Math.random() < 0.3 ? "success" : "failure";

        if(result == "success") {
            const robAmount = Math.floor(Math.random() * targetUser.walletbalance) + 1;

            await userAccount.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { walletbalance: robAmount } });
            await userAccount.findOneAndUpdate({ userId: user.id }, { $inc: { walletbalance: -robAmount } });

            await interaction.editReply(`You stole **__${robAmount}__** coins from ${user.username}... hey wtf thats illegal!`);

        } else {
            const lossAmount = Math.floor(existingUser.walletbalance * (Math.random() * 0.15));

            await userAccount.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { walletbalance: -lossAmount } });
            await userAccount.findOneAndUpdate({ userId: user.id }, { $inc: { walletbalance: lossAmount } });

            await interaction.editReply(`You got caught... you paid **__${lossAmount}__** coins to ${user.username}... you're a criminal!`);
        }

       return true;
    }}
