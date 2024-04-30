const userAccount = require("../../schemas/userAccount");

module.exports = async (client, guildMember) => {
    const user = await userAccount.findOne({ userId : guildMember.id });
    if (!user) return;
    await user.delete();
}