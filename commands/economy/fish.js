const userAccount = require("../../schemas/userAccount")

module.exports = {
    name: "fish",
    description: "fish to catch some fish...",
    requiresAccount: true,
    givesxp: true,
    cooldown: 120000,

    run: async(client, interaction) => {

        await interaction.deferReply();

        const userDocument = await userAccount.findOne({ userId: interaction.user.id })
        
        if(!userDocument.inventory.find(i => i.itemName === "Fishing Rod")) {
            interaction.editReply("You need a fishing rod to fish.. you're not good enough to catch them with your bare hands")
            return false;
        }

        const randomNumber = Math.floor(Math.random() * 100) + 1;
        let itemCaught;

    switch (true) {
    case (randomNumber <= 20):
        itemCaught = 'nothing';
        break;
    case (randomNumber <= 35):
        itemCaught = 'trash item';
        break;
    case (randomNumber <= 52):
        itemCaught = 'seaweed';
        break;
    case (randomNumber <= 72):
        itemCaught = 'regular fish';
        break;
    case (randomNumber <= 87):
        itemCaught = 'rare fish';
        break;
    case (randomNumber <= 97):
        itemCaught = 'shark';
        break;
    default:
        itemCaught = 'tek';


    }

    }
}