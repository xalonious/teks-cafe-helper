const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = {
    name: "pingroles",
    description: "sends ping roles idk",
    devOnly: true,

    run: async(client, interaction) => {
        const rrEmbed = new EmbedBuilder()
            .setTitle("Ping roles")
            .setDescription("Press the buttons below to get your ping roles! You may press again to remove the role.")

        const rrButtons1 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("dev").setLabel("Dev ping").setStyle(ButtonStyle.Primary).setEmoji("🛠️"),
            new ButtonBuilder().setCustomId("shift").setLabel("Shift ping").setStyle(ButtonStyle.Primary).setEmoji("📲"),
            new ButtonBuilder().setCustomId("training").setLabel("Training ping").setStyle(ButtonStyle.Primary).setEmoji("🛡️"),
            new ButtonBuilder().setCustomId("announcements").setLabel("Announcements ping").setStyle(ButtonStyle.Primary).setEmoji("📢"),
        )

        const rrButtons2 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId("activity").setLabel("Activity ping").setStyle(ButtonStyle.Primary).setEmoji("🏃🏼‍♂️"),
            new ButtonBuilder().setCustomId("alliance").setLabel("Alliance ping").setStyle(ButtonStyle.Primary).setEmoji("🏃🏼‍♂️"),
        )

        const rrChannel = interaction.guild.channels.cache.get("1227664831121854534")

        await rrChannel.send({ embeds: [rrEmbed], components: [rrButtons1, rrButtons2] })

        await interaction.reply({ content: "Reaction roles sent!", ephemeral: true })
    }
}