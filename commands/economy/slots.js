const slotItems = [
    ":watermelon:", ":apple:", ":slot_machine:", ":strawberry:", ":cherries:",
    ":lemon:", ":banana:", ":pineapple:", ":peach:", ":pear:", ":kiwi:", ":blueberries:",
    ":coconut:", ":mango:", ":grapes:", ":melon:", ":tangerine:", ":hot_pepper:", ":peanuts:", ":corn:"
];

const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const userAccount = require("../../schemas/userAccount");

module.exports = {
    name: "slots",
    description: "Play the slot machine",
    cooldown: 30000,
    requiresAccount: true,
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

        if (amount == "all") amount = existingUser.balance;

        amount = parseInt(amount);
        const bet = amount;

        let win = false;

        if (amount < 250) {
            interaction.editReply("hey... you can't bet less than 250 coins");
            return false;
        }

        if (amount > existingUser.walletbalance) {
            interaction.editReply("hey buddy... you only have " + existingUser.walletbalance + " coins... you can't bet more than you have...");
            return false;
        }

        let number = [];
        const spinningIterations = 4; 

        let spinningMessage = await interaction.editReply({ content: "Spinning...", embeds: [] });

        for (let j = 0; j < spinningIterations; j++) {
            for (let i = 0; i < 3; i++) {
                number[i] = Math.floor(Math.random() * slotItems.length);
            }

            let slotsEmbed = new EmbedBuilder()
                .setTitle("Slots")
                .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nSpinning...`)
                .setColor("#FFFFFF")
                .setThumbnail("https://png.pngtree.com/png-vector/20191113/ourlarge/pngtree-slot-machine-with-three-sevens-icon-flat-style-png-image_1977277.jpg");
            
            spinningMessage = await spinningMessage.edit({ content: "", embeds: [slotsEmbed] });

            await new Promise(resolve => setTimeout(resolve, 1000)); 
        }

        let slotsEmbed = new EmbedBuilder()
        .setTitle("Slots")
        .setColor("#FFFFFF")
        .setThumbnail("https://png.pngtree.com/png-vector/20191113/ourlarge/pngtree-slot-machine-with-three-sevens-icon-flat-style-png-image_1977277.jpg")
        

        if (number[0] == number[1] && number[1] == number[2]) {
            amount *= 9;
            win = true;
        } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
            amount *= 3;
            win = true;
        }

        if (win) {
            slotsEmbed.setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n<a:tekcoin:1234188584664436778> **You won ${amount - bet} coins!**`);
            slotsEmbed.setColor("Green");
            await spinningMessage.edit({ embeds: [slotsEmbed] });
            await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                $inc: {
                    walletbalance: amount
                }
            });
        } else {
            slotsEmbed.setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n<a:tekcoin:1234188584664436778> **You lost ${amount} coins!**`);
            slotsEmbed.setColor("Red");
            await spinningMessage.edit({ embeds: [slotsEmbed] });
            await userAccount.findOneAndUpdate({ userId: interaction.user.id }, {
                $inc: {
                    walletbalance: -amount
                }
            });
        }

        return true;
    }
}
