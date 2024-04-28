module.exports = {
	name: "speak",
	description: "Says anything as the bot",
	permissionsRequired: [PermissionsBitField.Flags.ManageMessages],
	options: [
		{
		name: "text",
			description: "what to say",
			type: ApplicationCommandOptionType.String,
			required: true
        }
	],

	run: async(client, interaction) => {
		const text = interaction.options.getString("text")

		await interaction.deferReply();
		await interaction.editReply(text);
	}
}
