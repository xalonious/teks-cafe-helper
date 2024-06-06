const {
	ApplicationCommandOptionType,
	PermissionsBitField
} = require("discord.js")
const axios = require("axios");
require("dotenv").config();

module.exports = {
	name: "shout",
	description: "shouts a message to the roblox group AND discord",
	permissionsRequired: [PermissionsBitField.Flags.ManageMessages],
	options: [
	{
		name: "title",
		description: "The title to shout",
		type: ApplicationCommandOptionType.String,
		required: true
	},
	{
		name: "message",
		description: "The message to shout",
		type: ApplicationCommandOptionType.String,
		required: true
	}


],

	run: async (client, interaction) => {

		await interaction.deferReply();

		const title = interaction.options.getString("title")
		const message = interaction.options.getString("message")
		const url = "https://www.guilded.gg/api/channels/2a9e12a0-5d45-4cf2-8fe7-778271e4453e/announcements";

		const headers = {
			"Host": "www.guilded.gg",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0",
			"Accept": "application/json, text/javascript, */*; q=0.01",
			"Accept-Language": "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3",
			"Accept-Encoding": "gzip, deflate, br, zstd",
			"Content-Type": "application/json",
			"guilded-viewer-platform": "desktop",
			"guilded-client-id": "691fbc37-f0a4-4bc7-930e-0d72af9ee618",
			"x-cdn-token": process.env.GUILDED_CDN_TOKEN,
			"X-Requested-With": "XMLHttpRequest",
			"Origin": "https://www.guilded.gg",
			"Referer": "https://www.guilded.gg/teks-cafe/groups/3ZJm4QP3/channels/2a9e12a0-5d45-4cf2-8fe7-778271e4453e/announcements",
			"Cookie": process.env.GUILDED_COOKIE,
			"Sec-Fetch-Dest": "empty",
			"Sec-Fetch-Mode": "cors",
			"Sec-Fetch-Site": "same-origin",
			"Sec-GPC": "1",
			"Priority": "u=1",
			"TE": "trailers"
		};

		const body = {
			"title": title,
			content: {
				object: "value",
				document: {
				  object: "document",
				  data: {},
				  nodes: [{
					object: "block",
					type: "paragraph",
					data: {},
					nodes: [{
					  object: "text",
					  leaves: [{
						object: "leaf",
						text: message,
						marks: []
					  }]
					}]
				  }]
				}
			  },
			"teamId": "RQ83NgKj",
			"gameId": null,
			"dontSendNotifications": false
		};

		const response = await axios.post(url, body, {
				headers: headers
			})

			if(response.status == 200) {
				await interaction.editReply("Succesfully shouted!")
			} else {
				await interaction.editReply("Failed to post shout, please try again later.")
				console.log(response.data)
			}

	}
}