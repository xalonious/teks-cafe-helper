const schedule = require("node-schedule");
const axios = require("axios");
require('dotenv').config();

module.exports = async(client) => {

    const rule = new schedule.RecurrenceRule();
    rule.tz = 'UTC';
    rule.hour = 13;
    rule.minute = 0;
    rule.second = 0;

    schedule.scheduleJob(rule, async() => {
        await QOTD();
    })



async function QOTD() {
    const qotdChannel = client.channels.cache.get("1222711888975237200")

    const messages = await qotdChannel.messages.fetch({ limit: 1 });
    const lastMessage = messages.first();

    const now = new Date();
    const lastMessageDate = lastMessage.createdAt;
    const diff = now - lastMessageDate;

    if(diff < 86400000) return;

    const qotd = await getQOTD();
    qotdChannel.send(qotd)
}


}



async function getQOTD() {
    await axios.post('https://api.anthropic.com/v1/messages', {
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [
        { role: 'user', content: 'hi there, I want you to ask me a question of the day. Say nothing but the question. Make it silly.' }
    ]
}, {
    headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
    }
})
}