const userAccount = require("../../schemas/userAccount");

module.exports = {
    name: "daily",
    description: "Claim your daily coins",
    requiresAccount: true,

    run: async (client, interaction) => {

        await interaction.deferReply();

        const user = await userAccount.findOne({ userId: interaction.user.id });

        const now = new Date();

        const midnightUTC = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1, 
            0,  
            0, 
            0,
            0 
        );

        const timeLeft = midnightUTC - now; 

        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        if (user.hasClaimedDaily) {
            return interaction.editReply(`you already claimed your daily coins today, stop being so damn greedy... you can claim them again in **${hoursLeft} hours and ${minutesLeft} minutes**`);
        }

        user.balance += 2500;
        user.hasClaimedDaily = true;
        await user.save();

        await interaction.editReply(`<a:tekcoin:1234188584664436778> You have claimed your daily **__2500 coins__**!`);
    }
}
