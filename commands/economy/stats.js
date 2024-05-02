const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const userAccount = require("../../schemas/userAccount");

module.exports = {
    name: "stats",
    description: "Check your or someone else's stats",
    requiresAccount: true,
    options: [
        {
            name: "user",
            description: "The user you want to see the stats of",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],

    run: async(client, interaction) => {

        await interaction.deferReply();

        const user = interaction.options.getUser("user") || interaction.user;

        const existingUser = await userAccount.findOne({ userId: user.id });

        if(!existingUser) return interaction.editReply("hey... they don't have an account yet... tell them to create one using `/createaccount`");

        const balEmbed = new EmbedBuilder()
        .setTitle(`${user.username}'s stats`)
        .setDescription(`**${convertToRomanNumeral(existingUser.levels.level)} | Level ${existingUser.levels.level}** \n <:xp:1235348097895370854> ${existingUser.levels.xp}/${existingUser.levels.xpneeded} \n\n <a:tekcoin:1234188584664436778> | Total Balance: ${existingUser.walletbalance + existingUser.bankbalance} \n <:wallet:1234992701603315762> | Wallet Balance: ${existingUser.walletbalance} \n :bank: | Bank Balance: ${existingUser.bankbalance}/${existingUser.bankcapacity}`)
        .setColor("Random")
        .setThumbnail(user.displayAvatarURL(), { dynamic: true })
        .setFooter({ text: "you poor lmao"})

        
        await interaction.editReply({ embeds: [balEmbed] });
    }
}


    function convertToRomanNumeral(num) {
        const romanNumerals = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        };
        let result = "";
        for (const key in romanNumerals) {
            const value = romanNumerals[key];
            result += key.repeat(Math.floor(num / value));
            num %= value;
        }
        return result;
    }

    

