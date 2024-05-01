const userAccount = require("../../schemas/userAccount");
const ms = require("ms"); 

module.exports = {
    name: "daily",
    description: "Claim your daily coins",
    requiresAccount: true,

    run: async (client, interaction) => {


        await interaction.deferReply();

        const user = await userAccount.findOne({ userId: interaction.user.id });

        if (user.hasClaimedDaily) {
            return interaction.editReply(`you already claimed your daily coins today, stop being so damn greedy... you can claim them at midnight UTC`);
        }

        user.walletbalance += 2500;
        user.hasClaimedDaily = true;


        await user.save();


        await interaction.editReply(`<a:tekcoin:1234188584664436778> You have claimed your daily **__2500 coins__**!`);
    }
}