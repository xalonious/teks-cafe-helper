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

        if(user.id == interaction.user.id) return interaction.editReply("hey... you can't rob yourself... that's not how it works");

        const existingUser = await userAccount.findOne({ userId: interaction.user.id });
        const targetUser = await userAccount.findOne({ userId: user.id });

        if(!targetUser) return interaction.editReply("hey... they don't have an account yet... tell them to create one using `/createaccount`");

        if(existingUser.balance < 250) return interaction.editReply("hey... you need at least 250 coins to rob someone...");

        const result = Math.random() < 0.3 ? "success" : "failure";

        if(result == "success") {
            const robAmount = Math.floor(Math.random() * targetUser.balance) + 1;

            await userAccount.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { balance: robAmount } });
            await userAccount.findOneAndUpdate({ userId: user.id }, { $inc: { balance: -robAmount } });

            await interaction.editReply(`You stole **__${robAmount}__** coins from ${user.username}... hey wtf thats illegal!`);

        } else {
            const lossAmount = Math.floor(existingUser.balance * (Math.random() * 0.15));

            await userAccount.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { balance: -lossAmount } });
            await userAccount.findOneAndUpdate({ userId: user.id }, { $inc: { balance: lossAmount } });

            await interaction.editReply(`You got caught... you paid **__${lossAmount}__** coins to ${user.username}... you're a criminal!`);
        }
    }}
