const Cooldown = require("../../schemas/daily");
const userAccount = require("../../schemas/userAccount");


module.exports = {
    name: "daily",
    description: "Claim your daily coins",
    requiresAccount: true,

    run: async(client, interaction) => {

        await interaction.deferReply();

        const existingUser = await userAccount.findOne({ userId: interaction.user.id });

        let cooldown = await Cooldown.findOne({ userId: interaction.user.id });
        if(cooldown && cooldown.cooldownExpiration > Date.now()) {
            const remainingTime = cooldown.cooldownExpiration - Date.now();
            const hours = Math.floor(( remainingTime / (1000 * 60 * 60) ) % 24);
            const minutes = Math.floor(( remainingTime / (1000 * 60) ) % 60);

            const timeLeftFormatted = `**${hours} hour(s), ${minutes} minute(s)**`;

            return interaction.editReply(`you already claimed your daily coins today, stop being so damn greedy... you can claim them again in  ${timeLeftFormatted}`);
        }

        existingUser.balance += 2500;

        await existingUser.save();

        const newCooldown = new Cooldown({
            userId: interaction.user.id,
            cooldownExpiration: Date.now() + 86400000
        });

        cooldown = await Cooldown.findOneAndUpdate({ userId: interaction.user.id }, newCooldown, { upsert: true, new: true });

        await interaction.editReply(`<a:tekcoin:1234188584664436778> You have claimed your daily **__2500 coins__**!`)
    }
}