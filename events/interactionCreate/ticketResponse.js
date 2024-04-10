const ticketSchema = require("../../schemas/Ticket");
const { PermissionsBitField, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    await interaction.deferReply({ ephemeral: true });

    const { guild, member, values } = interaction;
    const value = values[0];

    const existingTicket = await ticketSchema.findOne({ MemberID: member.id, Closed: false });
    if (existingTicket) {
        return interaction.editReply({ content: "You already have an open ticket.", ephemeral: true });
    }

    const ticketId = Math.floor(Math.random() * 1000000);

    if (!["ingame", "hr", "discord"].includes(value)) return;

    await interaction.editReply({ content: "Creating ticket...", ephemeral: true });

    const permissionOverwrites = [
        { id: "1042849969343844433", deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: member.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks] },
    ];

    if (value === "ingame") {
        permissionOverwrites.push({ id: "1227031971016867982", allow: [PermissionsBitField.Flags.ViewChannel] });
    } else if (value === "hr" || value === "discord") {
        permissionOverwrites.push({ id: "1227285303316713643", allow: [PermissionsBitField.Flags.ViewChannel] });
    }

    await guild.channels.create({
        name: `ticket-${member.user.username}`,
        type: ChannelType.GuildText,
        parent: "1227310704369860748",
        permissionOverwrites,
    })
        .then(async (channel) => {
               await ticketSchema.create({
                MemberID: member.id,
                TicketID: ticketId,
                ChannelID: channel.id,
                Closed: false,
                Type: value,
            });

            await interaction.editReply(`Ticket created successfully! [Click here to access the ticket channel](https://discord.com/channels/${guild.id}/${channel.id})`);

            const ticketEmbed = new EmbedBuilder()
                .setTitle(`Ticket Opened | type: ${value.toUpperCase()}`)
                .setDescription(`Thank you for creating a ticket, support will be with you shortly. While you wait, please describe your issue.`)
                .setColor("Blue")
                .setFooter({ text: `Ticket ID: ${ticketId}`, iconURL: member.displayAvatarURL({ dynamic: true }) });

            const ticketButton = new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId("close").setLabel("Close Ticket").setStyle(ButtonStyle.Primary).setEmoji("🔒"),
            );

            channel.send({
                content: "<@&1227031971016867982>",
                embeds: [ticketEmbed],
                components: [ticketButton],
            });
        });
};