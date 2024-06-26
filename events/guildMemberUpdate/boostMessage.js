const { EmbedBuilder } = require("discord.js");

module.exports = async(client, oldMember, newMember) => {
    const boostChannel = client.channels.cache.get("1222710473271676948");
    const boosterRole = newMember.guild.roles.cache.get("1223323088226222153");

    if (!oldMember.roles.cache.get(boosterRole) && newMember.roles.cache.get(boosterRole)) {
        let avatarURL = newMember.user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 });
        avatarURL = avatarURL.replace('.webp', '.png');
            let embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle("New Boost")
                .setDescription(`${newMember.user} just boosted the server! We now have ${newMember.guild.premiumSubscriptionCount} boosts!`)
                .setThumbnail(newMember.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setImage(`https://api.aggelos-007.xyz/boostcard?avatar=${avatarURL}&username=${newMember.user.username}`)
            boostChannel.send({ embeds: [embed] });
        } else if(oldMember.roles.cache.get(boosterRole) && !newMember.roles.cache.get(boosterRole)) {
            const colorRoles = {
                "red": "1227412353998524438",
                "orange": "1227412463582973962",
                "yellow": "1227412556428345404",
                "green": "1227412702645715056",
                "blue": "1227412837316689940",
                "pink": "1227412933106077798",
                "purple": "1227413008817455225",
            }
            
            for (const role in colorRoles) {
                if (newMember.roles.cache.has(colorRoles[role])) {
                    newMember.roles.remove(colorRoles[role]);
                }
            }

            let embed = new EmbedBuilder()
                .setColor('Red')
                .setTitle("Boost Removed")
                .setDescription(`${newMember.user} just unboosted the server... (or lost their nitro because they're poor)`)
                .setThumbnail(newMember.user.displayAvatarURL({ format: "png", dynamic: true }))
            boostChannel.send({ embeds: [embed] });
        }
}