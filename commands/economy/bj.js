const userAccount = require("../../schemas/userAccount");
const { ApplicationCommandOptionType, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
	name: "bj",
	description: "Play a game of blackjack to win some coins",
	requiresAccount: true,
	givesxp: true,
	cooldown: 30000,
	options: [{
		name: "amount",
		description: "The amount of money you want to bet",
		type: ApplicationCommandOptionType.String,
		required: true
	}],

	run: async (client, interaction) => {
		await interaction.deferReply();
		let amount = interaction.options.getString("amount");

		const existingUser = await userAccount.findOne({
			userId: interaction.user.id
		});

		if (isNaN(amount) && amount !== "all") {
			interaction.editReply("hey... that's not a number... you can't bet that...");
			return false;
		}
		if (amount == "all") amount = existingUser.walletbalance;

		if (amount < 250) {
			interaction.editReply("hey... you can't bet less than 250 coins");
			return false;
		
		}

		if (existingUser.walletbalance < amount) {
			interaction.editReply("hey buddy... you only have " + existingUser.walletbalance + " coins... you can't bet more than you have...");
			return false;
		
		}

		const playerHand = [];
		const dealerHand = [];

		playerHand.push(dealCard(playerHand.concat(dealerHand)));
		dealerHand.push(dealCard(playerHand.concat(dealerHand)));
		playerHand.push(dealCard(playerHand.concat(dealerHand)));
		dealerHand.push(dealCard(playerHand.concat(dealerHand)));

		const bjEmbed = new EmbedBuilder()
			.setTitle("blackjack")
			.setColor("#FFFFFF")
			.setThumbnail("https://tse1.mm.bing.net/th?id=OIP.g8C90-Qsi8DuaE35Em9hhQHaHa&pid=Api&P=0&h=220")
			.setDescription(`i love blackjack! you have bet ${amount} coins`);

		await interaction.editReply({ embeds: [bjEmbed] });
		updateScore(interaction, bjEmbed, playerHand, dealerHand);

		while (await runRound(playerHand, dealerHand, interaction, bjEmbed)) {
			updateScore(interaction, bjEmbed, playerHand, dealerHand);
		}

		const playerScore = calculateHandScore(playerHand);
		const dealerScore = calculateHandScore(dealerHand);

		const winnings = calculateWinnings(playerScore, dealerScore, amount);

		if (winnings > 0) {
			await userAccount.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { walletbalance: amount } });
			updateScore(interaction, bjEmbed, playerHand, dealerHand, false);
			await interaction.editReply({ embeds: [bjEmbed.setDescription(`<a:tekcoin:1234188584664436778> YOU WON! you got ${amount} coins`)] });
		}
		if (winnings < 0) {
			await userAccount.findOneAndUpdate({ userId: interaction.user.id }, { $inc: { walletbalance: -amount } });
			updateScore(interaction, bjEmbed, playerHand, dealerHand, false);
			await interaction.editReply({ embeds: [bjEmbed.setDescription(`you suck at this, you lost ${amount} coins`)] });
		}
		if (winnings === 0) {
			updateScore(interaction, bjEmbed, playerHand, dealerHand, false);
			await interaction.editReply({ embeds: [bjEmbed.setDescription(`it was a tie. no money lost.`)] });
		}

		return true;
	}
}

async function runRound(playerHand, dealerHand, interaction, bjEmbed) {
	updateScore(interaction, bjEmbed, playerHand, dealerHand, true);

	const hit = new ButtonBuilder()
		.setLabel("Hit")
		.setStyle(1)
		.setCustomId("hit");

	const stand = new ButtonBuilder()
		.setLabel("Stand")
		.setStyle(2)
		.setCustomId("stand");

	const row = new ActionRowBuilder()
		.addComponents(hit, stand);

	const response = await interaction.channel.send({
		content: `do you want to hit or stand?`,
		components: [row],
		ephemeral: true,
	});

	try {
		const confirmation = await response.awaitMessageComponent({
			filter: (i) => i.user.id === interaction.user.id,
			time: 60_000
		});

		if (confirmation.customId === 'hit') {
			playerHand.push(dealCard(playerHand.concat(dealerHand)));

			if (calculateHandScore(playerHand) > 21) {
				await confirmation.update({ components: [] });
				await confirmation.deleteReply();
				return false;
			}

			await confirmation.update({ components: [] });
			await confirmation.deleteReply();

			return true;
		} else if (confirmation.customId === 'stand') {
			while (calculateHandScore(dealerHand) < 17) {
				dealerHand.push(dealCard(playerHand.concat(dealerHand)));
			}
			await confirmation.update({ components: [] });
			await confirmation.deleteReply();

			return false;
		}

	} catch (e) {
		await interaction.editReply({ components: [] });
		await confirmation.deleteReply();
		return false;
	}
}


async function updateScore(interaction, embed, playerHand, dealerHand, hide) {
	let cardemojis = ["♠️", "♣️", "♥️", "♦️"];
	let playerCards = playerHand.map(card => card + " " + cardemojis[card.charCodeAt(0) % 4]);
	let dealerCards = dealerHand.map((card, index) => hide && index === dealerHand.length - 1 ? "?" : card + " " + cardemojis[card.charCodeAt(0) % 4]);

	await interaction.editReply({
		embeds: [embed.setFields({
			name: "Player",
			value: playerCards.join(" "),
			inline: false
		}, {
			name: "Dealer",
			value: dealerCards.join(" "),
			inline: false
		}, {
			name: "Your Score",
			value: calculateHandScore(playerHand).toString(),
			inline: false
		})]
	});
}

function dealCard(usedCards) {
	const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	const availableCards = cards.filter(card => !usedCards.includes(card));
	const randomIndex = Math.floor(Math.random() * availableCards.length);
	return availableCards[randomIndex];
}

function calculateHandScore(hand) {
	let score = 0;
	let numAces = 0;

	for (const card of hand) {
		if (card === "A") {
			if (score + 11 > 21) {
				score += 1;
			} else {
				score += 11;
				numAces++;
			}
		} else if (card === "K" || card === "Q" || card === "J") {
			score += 10;
		} else {
			score += parseInt(card);
		}
	}

	while (score > 21 && numAces > 0) {
		score -= 10;
		numAces--;
	}

	return score;
}

function calculateWinnings(playerScore, dealerScore, betAmount) {
	if (playerScore > 21) {
		return -betAmount;
	} else if (dealerScore > 21) {
		return betAmount;
	} else if (playerScore > dealerScore) {
		return betAmount;
	} else if (playerScore < dealerScore) {
		return -betAmount;
	} else {
		return 0;
	}
}