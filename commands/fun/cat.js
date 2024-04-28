const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "cat",
    description: "we love cats",

    run: async(client, interaction) => {

    await interaction.deferReply();
    
    const response = await axios.get("https://api.thecatapi.com/v1/images/search");
    const data = response.data[0].url;

    const catEmbed = new EmbedBuilder()
    .setTitle("Kitty")
    .setImage(data)
    .setColor("Random")
    
    await interaction.editReply({ embeds: [catEmbed] });
}}