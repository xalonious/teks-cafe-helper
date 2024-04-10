const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: 'reactionroles',
    description: 'Send the reaction roles message',
    devOnly: true,

    run: async (client, interaction) => {
        const rrEmbed = new EmbedBuilder()
            .setTitle("Color roles")
            .setDescription("Press the buttons below to get your color roles! You may press again to remove the role.")

        const rrButtons1 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("red").setLabel("Red").setStyle(ButtonStyle.Primary).setEmoji("🟥"),
            new ButtonBuilder().setCustomId("orange").setLabel("Orange").setStyle(ButtonStyle.Primary).setEmoji("🟧"),
            new ButtonBuilder().setCustomId("yellow").setLabel("Yellow").setStyle(ButtonStyle.Primary).setEmoji("🟨"),
            new ButtonBuilder().setCustomId("green").setLabel("Green").setStyle(ButtonStyle.Primary).setEmoji("🟩"),
        )

        const rrButtons2 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("blue").setLabel("Blue").setStyle(ButtonStyle.Primary).setEmoji("🟦"),
            new ButtonBuilder().setCustomId("pink").setLabel("Pink").setStyle(ButtonStyle.Primary).setEmoji("🩷"),
            new ButtonBuilder().setCustomId("purple").setLabel("Purple").setStyle(ButtonStyle.Primary).setEmoji("🟪"),
        )

        const rrChannel = interaction.guild.channels.cache.get("1227414626673889411")

        await rrChannel.send({ embeds: [rrEmbed], components: [rrButtons1, rrButtons2] })

        await interaction.reply({ content: "Reaction roles sent!", ephemeral: true })
    }
}
