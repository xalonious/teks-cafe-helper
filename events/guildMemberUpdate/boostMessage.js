const { EmbedBuilder } = require("discord.js");

module.exports = async(client, oldMember, newMember) => {
    const boostChannel = client.channels.cache.get("1222710473271676948");

    if (!oldMember.premiumSince && newMember.premiumSince) {
        let avatarURL = newMember.user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 });
        avatarURL = avatarURL.replace('.webp', '.png');
            let embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle("New Boost")
                .setDescription(`${newMember.user} just boosted the server! We now have ${newMember.guild.premiumSubscriptionCount} boosts!`)
                .setThumbnail(newMember.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setImage(`https://api.aggelos-007.xyz/boostcard?avatar=${avatarURL}&username=${newMember.user.username}`)
            boostChannel.send({ embeds: [embed] });
        } else if(oldMember.premiumSince && !newMember.premiumSince) {
            let embed = new EmbedBuilder()
                .setColor('Red')
                .setTitle("Boost Removed")
                .setDescription(`${newMember.user} just unboosted the server... (or lost their nitro because they're poor)`)
                .setThumbnail(newMember.user.displayAvatarURL({ format: "png", dynamic: true }))
            boostChannel.send({ embeds: [embed] });
        }
}