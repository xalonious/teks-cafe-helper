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

    if (!["ingame", "hr", "pr", "discord"].includes(value)) return;

    await interaction.editReply({ content: "Creating ticket...", ephemeral: true });

    const permissionOverwrites = [
        { id: "1042849969343844433", deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: member.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.EmbedLinks] },
    ];

    switch (value) {
        case "ingame":
            permissionOverwrites.push({ id: "1227031971016867982", allow: [PermissionsBitField.Flags.ViewChannel] });
            break;
        case "hr":
        case "discord":
            permissionOverwrites.push({ id: "1227285303316713643", allow: [PermissionsBitField.Flags.ViewChannel] });
            break;
        case "pr":
            permissionOverwrites.push({ id: "1227731241214808134", allow: [PermissionsBitField.Flags.ViewChannel] });
            break;
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
                Type: value,
            });

            await interaction.editReply(`Ticket created successfully! [Click here to access the ticket channel](https://discord.com/channels/${guild.id}/${channel.id})`);

            let pingedRole;
            switch (value) {
                case "ingame":
                    pingedRole = "1227031971016867982"; 
                    break;
                case "hr":
                case "discord":
                    pingedRole = "1227285303316713643"; 
                    break;
                case "pr":
                    pingedRole = "1227731241214808134"; 
                    break;
            }

            const ticketEmbed = new EmbedBuilder()
                .setTitle(`Ticket Opened | type: ${value.toUpperCase()}`)
                .setDescription(`Thank you for creating a ticket, support will be with you shortly. While you wait, please describe your issue.`)
                .setColor("Blue")
                .setFooter({ text: `Ticket ID: ${ticketId}`, iconURL: member.displayAvatarURL({ dynamic: true }) });

            const ticketButton = new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId("claim").setLabel("Claim Ticket").setStyle(ButtonStyle.Danger).setEmoji("🙋🏼‍♂️"),
                new ButtonBuilder().setCustomId("close").setLabel("Close Ticket").setStyle(ButtonStyle.Primary).setEmoji("🔒"),
            );

            const messageOptions = {
                embeds: [ticketEmbed],
                components: [ticketButton],
            };

            if (pingedRole) {
                messageOptions.content = `<@&${pingedRole}>`;
            }

            channel.send(messageOptions);
        });
};