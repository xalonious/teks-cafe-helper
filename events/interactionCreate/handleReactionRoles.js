module.exports = (client, interaction) => {
    if(!interaction.isButton()) return;
    if(!interaction.member.roles.cache.get("1223323088226222153")) return interaction.reply({ content: "You must be a server booster to get the color roles!", ephemeral: true });

    const { customId, member } = interaction;

    const roles = {
        "red": "1227412353998524438",
        "orange": "1227412463582973962",
        "yellow": "1227412556428345404",
        "green": "1227412702645715056",
        "blue": "1227412837316689940",
        "pink": "1227412933106077798",
        "purple": "1227413008817455225",
    }


    if(!Object.keys(roles).includes(customId)) return;

    const role = interaction.guild.roles.cache.get(roles[customId]);

    if(member.roles.cache.has(role.id)) {
        member.roles.remove(role);
        interaction.reply({ content: `Removed ${role.name} from you!`, ephemeral: true })
    } else {
        member.roles.add(role);
        interaction.reply({ content: `Added ${role.name} to you!`, ephemeral: true })
    }

}