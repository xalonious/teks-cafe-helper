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

        const droppedFishingPole = Math.random() < 0.10;

        if(droppedFishingPole) {
            const itemIndex = userDocument.inventory.findIndex(i => i.itemName === "Fishing Rod");
            if(itemIndex !== -1) {
                userDocument.inventory[itemIndex].quantity -= 1;
                if(userDocument.inventory[itemIndex].quantity === 0) {
                    userDocument.inventory.splice(itemIndex, 1);
                }
                userDocument.save();
            }
            interaction.editReply("STOOPID!!! You dropped your fishing rod in the water... you're gonna have to buy another now...")
            return true;
        }


        let itemCaught;

        switch (true) {
            case (randomNumber <= 25):
                itemCaught = 'nothing';
                break;
            case (randomNumber <= 43):
                itemCaught = 'Garbage';
                break;
            case (randomNumber <= 73):
                itemCaught = 'Fish';
                break;
            case (randomNumber <= 88):
                itemCaught = 'Rare Fish';
                break;
            case (randomNumber <= 98):
                itemCaught = 'Shark';
                break;
            default:
                itemCaught = 'Tek';
        }
        
    let replyString;

    switch(itemCaught) {
        case 'nothing':
            replyString = "You didn't catch anything... better luck next time"
            break;
        case 'Garbage':
            replyString = "You caught some trash... ew... 🗑️"
            break;
        case 'Fish':
            replyString = "You caught a fish! 🐟"
            break;
        case 'Rare Fish':
            replyString = "You caught a rare fish! 🐠"
            break;
        case 'Shark':
            replyString = "You caught a shark! 🦈"
            break;
        case 'Tek':
            replyString = "you caught... tek? what the hell is tek doing at the bottom of the ocean <:tek:1235580372620808193>"            
            break;
    }

    if(itemCaught !== "nothing") {
        const itemIndex = userDocument.inventory.findIndex(i => i.itemName === itemCaught);
        if(itemIndex === -1) {
            userDocument.inventory.push({ itemName: itemCaught, quantity: 1 })
        } else {
            userDocument.inventory[itemIndex].quantity += 1;
        }
        userDocument.save();
    }

    interaction.editReply(replyString);

    return true;

    }
}