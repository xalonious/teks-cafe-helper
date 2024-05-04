const { EmbedBuilder } = require("discord.js")

module.exports = (client, guildMember) => {
    const logsChannel = guildMember.guild.channels.cache.get("1236318468127719424")
     const logEmbed = new EmbedBuilder()
        .setAuthor({name: "Member Left", iconURL: guildMember.user.displayAvatarURL()})
        .setDescription(`${guildMember} ${guildMember.user.tag}`)
        .addFields(
        {name: "Current Member Count", value: `${guildMember.guild.memberCount}`}
        )
        .setFooter({text: `ID: ${guildMember.user.id}`})
        .setColor("Red")
    
        logsChannel.send({embeds: [logEmbed]})
}