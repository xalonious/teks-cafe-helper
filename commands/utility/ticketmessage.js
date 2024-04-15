const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "ticket",
    description: "sends the ticket message",
    devOnly: true,

    run: async (client, interaction) => {
        const ticketEmbed = new EmbedBuilder()
            .setTitle("Teks cafe Support System")
            .setDescription("Select an option from the menu below to open a ticket.")
            .setColor("Blurple")
            .setThumbnail(interaction.guild.iconURL())

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("ticket")
            .setPlaceholder("Select an option...")
            .addOptions([
                new StringSelectMenuOptionBuilder()
                    .setLabel("In-game Support")
                    .setValue("ingame")
                    .setDescription("For general in-game support please open this ticket.")
                    .setEmoji("📩"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("HR support")
                    .setValue("hr")
                    .setDescription("For HR support please open this ticket.")
                    .setEmoji("📩"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("PR support")
                    .setValue("pr")
                    .setDescription("For PR support please open this ticket.")
                    .setEmoji("📩"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Discord support")
                    .setValue("discord")
                    .setDescription("For discord support please open this ticket.")
                    .setEmoji("📩")
            ]);

        const row = new ActionRowBuilder()
            .addComponents(selectMenu);

        await interaction.guild.channels.cache.get("1227310091787567196").send({
            embeds: [ticketEmbed],
            components: [row]
        });

        interaction.reply("sent the ticket message!");
    }
};