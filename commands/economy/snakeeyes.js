const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const userAccount = require("../../schemas/userAccount");

const diceEmojis = [
    "<:dice_1:1236692153812516947>",
    "<:dice_2:1236692155163086928>",
    "<:dice_3:1236692156698198108>",
    "<:dice_4:1236692158178918530>",
    "<:dice_5:1236692150738092083>",
    "<:dice_6:1236692152118153319>"
];

module.exports = {
    name: "snakeeyes",
    description: "Play the snake eyes game",
    cooldown: 30000,
    requiresAccount: true,
    givesxp: true,
    options: [
        {
            name: "amount",
            description: "The amount of money you want to bet",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction) => {

        await interaction.deferReply();

        let amount = interaction.options.getString("amount");

        const existingUser = await userAccount.findOne({ userId: interaction.user.id });

        if (isNaN(amount) && amount !== "all") {
            interaction.editReply("hey... that's not a number... you can't bet that...");
            return false;
        }

        if (amount == "all") amount = existingUser.walletbalance;

        amount = parseInt(amount);
        const bet = amount;

        if (amount < 250) {
            interaction.editReply("hey... you can't bet less than 250 coins");
            return false;
        }

        if (amount > existingUser.walletbalance) {
            interaction.editReply("hey buddy... you only have " + existingUser.walletbalance + " coins... you can't bet more than you have...");
            return false;
        }

        let dice = [];
        const spinningIterations = 4; 

        let snakeEyesEmbed = new EmbedBuilder()
            .setTitle("Snake Eyes")
            .setDescription("Rolling...")
            .setColor("#FFFFFF")
            .setThumbnail("https://cdn-icons-png.flaticon.com/512/229/229800.png");
        
        let spinningMessage = await interaction.editReply({ content: "", embeds: [snakeEyesEmbed] });

        for (let j = 0; j < spinningIterations; j++) {
            for (let i = 0; i < 2; i++) {
                dice[i] = Math.floor(Math.random() * diceEmojis.length);
            }

            snakeEyesEmbed.setDescription(`${diceEmojis[dice[0]]} | ${diceEmojis[dice[1]]}\n\nRolling...`);
            spinningMessage = await spinningMessage.edit({ content: "", embeds: [snakeEyesEmbed] });

            await new Promise(resolve => setTimeout(resolve, 1000)); 
        }

        let win = false;
        if (dice[0] == 0 && dice[1] == 0) {
            amount *= 5;
            win = true;
        } else if (dice[0] == 0 || dice[1] == 0) {
            amount *= 2;
            win = true;
        }

        if (win) {
            const winnings = amount - bet;
            snakeEyesEmbed.setDescription(`${diceEmojis[dice[0]]} | ${diceEmojis[dice[1]]}\n\n<a:tekcoin:1234188584664436778> **You won ${winnings} coins!**`);
            snakeEyesEmbed.setColor("Green");
            await interaction.editReply({ embeds: [snakeEyesEmbed] });
            await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                $inc: {
                    walletbalance: winnings
                }
            });
        } else {
            snakeEyesEmbed.setDescription(`${diceEmojis[dice[0]]} | ${diceEmojis[dice[1]]}\n\n<a:tekcoin:1234188584664436778> **You lost ${amount} coins!**`);
            snakeEyesEmbed.setColor("Red");
            await interaction.editReply({ embeds: [snakeEyesEmbed] });
            await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                $inc: {
                    walletbalance: -amount
                }
            });
        }

        return true;
    }
}
