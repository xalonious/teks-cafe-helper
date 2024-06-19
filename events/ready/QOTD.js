const schedule = require("node-schedule");
const axios = require("axios");
require('dotenv').config();
const crypto = require("crypto");

module.exports = async(client) => {

    const qotdChannel = client.channels.cache.get("1222711888975237200");

    const rule = new schedule.RecurrenceRule();
    rule.tz = 'UTC';
    rule.hour = 13;
    rule.minute = 0;
    rule.second = 0;

    schedule.scheduleJob(rule, async() => {
        const qotd = await getQOTD();
        qotdChannel.send(`**:tek_logo: | NEW ACTIVITY!** \n\n Greetings, <@&1227663262796218368>. For today's activity feel free to answer the following question in <#1042849970333679720> ; \n\n - __${qotd}__ \n\n teks cafe helper, \n Best bot in the world`);

    })



    async function getQOTD() {
        const uniqueId = crypto.randomBytes(16).toString("hex");
        const qotd = await axios.post('https://api.anthropic.com/v1/messages', {
            model: 'claude-3-opus-20240229',
            max_tokens: 1024,
            messages: [
                { role: 'user', content: `hi there, I want you to ask me a question of the day. Say nothing but the question. Here is a unique id to ensure that all responses are unique, pay no attention to it: ${uniqueId}` }
            ]
        }, {
            headers: {
                'x-api-key': process.env.QOTD_API_KEY,
                'anthropic-version': '2023-06-01',
                'Content-Type': 'application/json'
            }
        });
        return qotd.data.content[0].text;
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