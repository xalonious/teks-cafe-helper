const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "say",
    description: "makes the bot say something",
    options: [
        {
            name: "message",
            description: "the message you want the bot to say",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run : async(client, interaction) => {
        const message = interaction.options.getString("message")
        const sayLogChan = client.channels.cache.get("1236387693194379416");

        if(message.includes("@everyone") || message.includes("@here")) {
                interaction.reply({
                content: "nice try buddy",
                ephemeral: true
            })

            return sayLogChan.send({
                content: `**${interaction.user.tag}** tried to use everyone or here in the say command`
            })
        }

        const regex = /<@[!&]?\d+>/g;

        if(regex.test(message)) {
            interaction.reply({
                content: "You cannot use pings in this command",
                ephemeral: true
            })
            return sayLogChan.send({
                content: `**${interaction.user.tag}** tried to use pings in the say command`
            })
        }

        interaction.channel.send(message)


        interaction.reply({
            content: "Sent message!",
            ephemeral: true
        })
        sayLogChan.send(`${interaction.user.tag} used the say command in ${interaction.channel} with the message: ${message}`)
    }
}