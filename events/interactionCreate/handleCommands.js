const devs = ["531479392128598027"];
const getLocalCommands = require("../../utils/getLocalCommands");
const userAccount = require("../../schemas/userAccount");

const cooldowns = new Map();

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();
    const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

    if (!commandObject) return;

    if (commandObject.devOnly && !devs.includes(interaction.member.id)) {
        return interaction.reply("Only Xander is able to use this command.");
    }

    if (commandObject.permissionsRequired?.every((permission) => !interaction.member.permissions.has(permission))) {
        return interaction.reply("You do not have permission to run that command!");
    }

    if (commandObject.requiresAccount) {
        const existingUser = await userAccount.findOne({ userId: interaction.user.id });
        if (!existingUser) return interaction.reply("Hey... you don't have an account yet... create one using `/createaccount`");
    }

    const cooldownKey = `${interaction.commandName}-${interaction.user.id}`;
    let cooldown = commandObject.cooldown || 0;
    let reducedCooldown = false;

    const boosterRole = interaction.member.roles.cache.get("1223323088226222153");
    if (boosterRole) {
        cooldown /= 2;
        reducedCooldown = true;
    }


    const now = Date.now();
    if (cooldowns.has(cooldownKey) && cooldowns.get(cooldownKey) > now) {
        const timeLeft = cooldowns.get(cooldownKey) - now;
        const hours = Math.floor(timeLeft / 3600000);
        const minutes = Math.floor((timeLeft % 3600000) / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);

        let timeLeftString = "hey do you like cooldowns? cause i sure do haha.. you need to wait";
        if (hours > 0) {
            timeLeftString += ` ${hours} hour${hours > 1 ? "s" : ""}`;
        }
        if (minutes > 0) {
            timeLeftString += ` ${minutes} minute${minutes > 1 ? "s" : ""}`;
        }
        if (seconds > 0) {
            timeLeftString += ` ${seconds} second${seconds > 1 ? "s" : ""}`;
        }

        timeLeftString += " before you can run this command again\n";

        if (reducedCooldown) {
            timeLeftString += " since you're a server booster, cooldowns are cut in half for you!!! thx 4 boosting";
        } else {
            timeLeftString += " did you know that server boosters get their cooldowns cut in half? boost today";
        }

        return interaction.reply(timeLeftString);
    }

    cooldowns.set(cooldownKey, now + cooldown);

    try {
        await commandObject.run(client, interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            interaction.followUp(`There was an error while running this command. ${error}`);
        } else interaction.reply(`There was an error while running this command. ${error}`);
    }
};
