const getMemberCount = require("../../utils/getMemberCount");
const fs = require("fs").promises;
const { EmbedBuilder } = require("discord.js");

module.exports = async(client) => {
    let lastMemberCount = await getMemberCount();

    const memChannel = client.channels.cache.get("1231936029280440391");
    const memberJoinedEmbed = new EmbedBuilder()
        .setTitle("New member joined")
        .setColor("Aqua")
        .setThumbnail("https://cdn.discordapp.com/attachments/717071622334578751/1227407139799306282/image.png?ex=6631857a&is=661f107a&hm=c22120ae327cab3f78cb529f2284a88ddc7d537b396d1dfc76ead1022b9e0a94&");
    const memberLeftEmbed = new EmbedBuilder()
        .setTitle("Member left")
        .setColor("Red")
        .setThumbnail("https://cdn.discordapp.com/attachments/717071622334578751/1227407139799306282/image.png?ex=6631857a&is=661f107a&hm=c22120ae327cab3f78cb529f2284a88ddc7d537b396d1dfc76ead1022b9e0a94&");

    async function updateMemberCount() {
        try {
            const data = await fs.readFile("goal.json", "utf8");
            const jsonData = JSON.parse(data);
            const currentCount = await getMemberCount();

            if (currentCount && currentCount !== lastMemberCount) {
                const currentTarget = jsonData.goal;
                const amountLeft = currentTarget - currentCount;

                if (amountLeft === 0) {
                    memberJoinedEmbed.setDescription(`We now have ${currentCount} members! We have reached our goal! 🥳`);
                    memberJoinedEmbed.setFooter({ text: `New goal: ${currentTarget + 100}` });
                } else {
                    memberJoinedEmbed.setDescription(`We now have ${currentCount} members! Only ${amountLeft} to go to reach our goal of ${currentTarget}!`);
                }

                memberLeftEmbed.setDescription(`We now have ${currentCount} members! Only ${amountLeft} to go to reach our goal of ${currentTarget}!`);

                if (currentCount > lastMemberCount) {
                    await memChannel.send({ embeds: [memberJoinedEmbed] });
                } else if (currentCount < lastMemberCount) {
                    await memChannel.send({ embeds: [memberLeftEmbed] });
                }

                if (currentCount >= currentTarget) {
                    let newGoal = currentTarget + 100;
                    jsonData.goal = newGoal;
                    const updatedGoalData = JSON.stringify(jsonData, null, 2);

                    try {
                        await fs.writeFile("goal.json", updatedGoalData, "utf8");
                        console.log(`Goal updated to ${newGoal}`);
                    } catch (err) {
                        console.error("Error writing to goal.json:", err);
                    }
                }

                lastMemberCount = currentCount;
            }
        } catch (err) {
            console.error("Error updating member count:", err);
        } finally {
            setTimeout(updateMemberCount, 60 * 1000); 
        }
    }

    updateMemberCount(); 
}
