const userAccount = require("../../schemas/userAccount");

module.exports = {
    name: "createaccount",
    description: "Create your account for the economy system",

    run: async(client, interaction) => {

        await interaction.deferReply();

        const existingUser = await userAccount.findOne({ userId: interaction.user.id });
        if(existingUser) return interaction.editReply("hey... you already have an account. stop trying to fool me.");

            const newAccount = new userAccount({
            userId: interaction.user.id
        });

        await newAccount.save();

        await interaction.editReply("Account created successfully! You can now use the economy system");
    }
}