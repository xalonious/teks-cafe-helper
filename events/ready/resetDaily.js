const user = require("../../schemas/userAccount");
const schedule = require("node-schedule");

module.exports = async (client) => {
    const rule = new schedule.RecurrenceRule();
    rule.tz = 'UTC';
    rule.hour = 0;
    rule.minute = 0;
    rule.second = 0;

    schedule.scheduleJob(rule, async () => {
        await resetDaily();
    });
}


async function resetDaily() {
    const users = await user.find();

    for (const user of users) {
        if (user.daily.hasClaimedDaily) {
            user.daily.streak = user.daily.streak + 1;
        } else if (user.daily.streak > 1) {
            user.daily.streak = 1;
        }
        user.daily.hasClaimedDaily = false;
        await user.save();
    }
}
