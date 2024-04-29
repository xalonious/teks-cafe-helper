const getMemberCount = require("../../utils/getMemberCount")
const fs = require("fs")
const { EmbedBuilder } = require("discord.js")

let lastMemberCount;
let jsonData;

module.exports = async(client) => {
    lastMemberCount = await getMemberCount()

    const memChannel = client.channels.cache.get("1231936029280440391")
    const memberJoinedEmbed = new EmbedBuilder()
        .setTitle("New member joined")
        .setColor("Aqua")
        .setThumbnail(
            "https://cdn.discordapp.com/attachments/717071622334578751/1227407139799306282/image.png?ex=6631857a&is=661f107a&hm=c22120ae327cab3f78cb529f2284a88ddc7d537b396d1dfc76ead1022b9e0a94&"
        )
    const memberLeftEmbed = new EmbedBuilder()
        .setTitle("Member left")
        .setColor("Red")
        .setThumbnail(
            "https://cdn.discordapp.com/attachments/717071622334578751/1227407139799306282/image.png?ex=6631857a&is=661f107a&hm=c22120ae327cab3f78cb529f2284a88ddc7d537b396d1dfc76ead1022b9e0a94&"
        )

    async function updateMemberCount() {
        fs.readFile("goal.json", (err, data) => {
            if (err) throw err;
            jsonData = JSON.parse(data);
        });

        const currentCount = await getMemberCount()

        if (currentCount !== lastMemberCount) {
            if(currentCount == undefined) return;
            const currentTarget = parseInt(jsonData.goal);
            const amountLeft = currentTarget - currentCount

            if(amountLeft == 0) {
                memberJoinedEmbed.setDescription(
                    `We now have ${currentCount} members! We have reached our goal! 🥳`
                )
                memberJoinedEmbed.setFooter({text: `New goal: ${currentTarget + 50}`})
            } else {
                memberJoinedEmbed.setDescription(`We now have ${currentCount} members! Only ${amountLeft} to go to reach our goal of ${currentTarget}!`)
            }

            memberLeftEmbed.setDescription(
                `We now have ${currentCount} members! Only ${amountLeft} to go to reach our goal of ${currentTarget}!`
            )

            if(currentCount > lastMemberCount) {
                memChannel.send({ embeds: [memberJoinedEmbed] })
            } else if(currentCount < lastMemberCount) {
                memChannel.send({embeds: [memberLeftEmbed]})
            }

            if(currentCount >= currentTarget) {
                let newGoal = currentTarget + 50
                jsonData.goal = newGoal
                const updatedGoalData = JSON.stringify(jsonData, null, 2)
                const filePath = 'goal.json';
                fs.writeFile(filePath, updatedGoalData, "utf8", (err) => {
                    if (err) throw err;
                    console.log(`Goal updated to ${newGoal}`)
                });
            }

            lastMemberCount = currentCount

        }
        setTimeout(updateMemberCount, 60 * 1000);
    }
    updateMemberCount();
}