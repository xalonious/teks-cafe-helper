const ticketSchema = require("../../schemas/Ticket")
const { EmbedBuilder } = require("discord.js")
const { createTranscript } = require("discord-html-transcripts")

module.exports = async (client, interaction) => {
    const { guild, member, customId, channel } = interaction;

    if (!interaction.isButton()) return;

    const permissions = member.roles.cache.get("1227031971016867982")

    if(customId !== "close") return;

    try {
        const data = await ticketSchema.findOne({ ChannelID: channel.id });

        if (!data) return;

        let ticketOwner = await guild.members.cache.get(data.MemberID);
        if(!ticketOwner) {
            ticketOwner = await guild.members.fetch(data.MemberID);
        }

        if(!permissions) return await interaction.reply({content: "You do not have permission to do that.", ephemeral: true});

        await interaction.reply(`Ticket closed by ${interaction.member}`);

        await wait(1000); 

        const transcriptMessage = await interaction.channel.send("Saving transcript...");

        const transcriptChannel = guild.channels.cache.get("1227313293312393237");

        const transcript = await createTranscript(channel, {
            filename: `ticket-${data.TicketID}.html`,
        });

        const transcriptEmbed = new EmbedBuilder()
            .setTitle(`Transcript for ticket #${data.TicketID}`)
            .setColor("Blue")
            .setAuthor({ name: ticketOwner.user.username, iconURL: ticketOwner.displayAvatarURL({ dynamic: true }) })
            .addFields(
                { name: "Ticket Owner", value: `${ticketOwner}`, inline: true },
                { name: "Ticket Name", value: channel.name, inline: true },
                { name: "Ticket ID", value: data.TicketID, inline: true },
                { name: "Type", value: data.Type.toUpperCase(), inline: true }
            )
            .setThumbnail("https://cdn3.iconfinder.com/data/icons/block/32/ticket-512.png")
            .setFooter({ text: "Teks Ticket System", iconURL: `${guild.iconURL()}` })

        await transcriptChannel.send({
            embeds: [transcriptEmbed],
            files: [transcript]
        });

        await transcriptMessage.edit("Transcript saved successfully!")

        await wait(1000); 

        interaction.channel.send("Deleting ticket in 5 seconds...");

        await wait(5000); 

        await channel.delete();
        await data.deleteOne();
    } catch (err) {
        if (err.message === "Unknown Member") {
            await interaction.reply("Ticket owner has left the server. Deleting ticket in 5 seconds...");
            setTimeout(async () => {
                await channel.delete();
            }, 5000);

            await ticketSchema.deleteOne({ ChannelID: channel.id });
        } else {
            console.log(err);
        }
    }
};

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}