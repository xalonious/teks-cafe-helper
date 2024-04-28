const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "cat",
    description: "we love dogs",

    run: async(client, interaction) => {

    await interaction.deferReply();
    
    const response = await axios.get("https://api.thedogapi.com/v1/images/search");
    const data = response.data[0].url;

    const catEmbed = new EmbedBuilder()
    .setTitle("doggy")
    .setImage(data)
    .setColor("Random")
    
    await interaction.editReply({ embeds: [catEmbed] });
}}