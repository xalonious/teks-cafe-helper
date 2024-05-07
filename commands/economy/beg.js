const userAccount = require("../../schemas/userAccount")

module.exports = {
    name: "beg",
    description: "beg for some coins",
    cooldown: 60000,
    requiresAccount: true,
    givesxp: true,

    run: async(client, interaction) => {

        await interaction.deferReply();

        const result = Math.random() < 0.6 ? "success" : "failure";

        const user = await userAccount.findOne({ userId: interaction.user.id });

        if(result === "success") {
            const amount = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
            interaction.editReply(`<a:tekcoin:1234188584664436778> Oh you poor soul, here's **__${amount}__** coins`);
            user.walletbalance += amount;
            await user.save();
        } else {
            const failedBegResponses = [
                "nah, would rather not feed your gambling addiction",
                "I can't even afford a McChicken, let alone give you coins",
                "HAHAHAHAHAHA no",
                "honestly why are you even begging, get a job",
                "how about no",
                "is monopoly money ok? no? sounds like a you problem",
                "Begging isn't a sustainable career choice, you know.",
                "If I had a penny for every time someone begged me for coins...",
                "The begging department is currently closed for renovations.",
                "I'd rather donate to a charity for needy bots.",
                "Your begging skills need some serious leveling up.",
                "I'm allergic to panhandling, sorry.",
                "Not today, not tomorrow, not ever.",
                "Maybe try a more convincing sob story next time.",
                "Even if I wanted to give you coins, I'd probably drop them in a sewer.",
                "If begging were an Olympic sport, you wouldn't even qualify.",
                "I'm fresh out of sympathy coins, sorry.",
                "Begging is for amateurs, try negotiating like a pro.",
                "I'm allergic to handing out freebies.",
                "You're as likely to get coins from me as winning the lottery without buying a ticket.",
                "I'd rather spend my coins on virtual bubble wrap popping.",
                "If I had a coin for every beggar, I'd probably have... well, still nothing.",
                "My generosity meter is at an all-time low.",
                "If wishes were coins, you'd still be broke.",
                "Sorry, I'm allergic to handing out freebies.",
                "I'd rather invest my coins in a 'make-believe' stock market.",
                "You have a better chance of winning a staring contest with a brick wall.",
                "If I had a nickel for every beggar, I'd probably have... well, still nothing.",
                "I'd rather spend my coins on imaginary unicorn rides.",
                "You're as likely to get coins from me as finding a needle in a haystack.",
                "Even if I wanted to, I'd probably forget where I put the coins.",
                "I'd rather use my coins as bait in a virtual fishing game.",
                "I'd rather use my coins as confetti at a paperless party.",
                "You have a better chance of catching a unicorn than getting coins from me.",
                "Sorry, I'm allergic to being begged at.",
                "Even if I wanted to, I'd probably accidentally donate the coins to a virtual museum.",
                "I'd rather use my coins to play a virtual game of 'pirate treasure hunt'.",
                "Even if I wanted to, I'd probably spend the coins on a novelty mug instead.",
                "You're as likely to get coins from me as winning a game of rock-paper-scissors with a rock.",
                "Even if I wanted to, I'd probably accidentally buy virtual socks instead.",
                "I'd rather use my coins to buy virtual real estate on Mars.",
                "Sorry, my coins are on strike, demanding better treatment.",
                "Even if I wanted to, I'd probably spend the coins on virtual fireworks.",
                "You're as likely to get coins from me as winning a game of hide and seek with a ghost.",
                "I'd rather use my coins to buy virtual stars and name them after myself.",
                "Even if I wanted to, I'd probably get distracted and forget to give you coins.",
                "You have a better chance of finding a leprechaun's pot of gold.",
            ];

            const response = failedBegResponses[Math.floor(Math.random() * failedBegResponses.length)];

            await interaction.editReply(response)

            return true;
        }

    }
}