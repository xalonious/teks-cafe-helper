const schedule = require("node-schedule");
const axios = require("axios");
const he = require("he");
require('dotenv').config();

module.exports = async(client) => {

    const qotdChannel = client.channels.cache.get("1222711888975237200");

    const rule = new schedule.RecurrenceRule();
    rule.tz = 'UTC';
    rule.hour = 13;
    rule.minute = 0;
    rule.second = 0;

    schedule.scheduleJob(rule, async() => {
        const qotd = await getQOTD();
        const formattedQOTD = formatQOTD(qotd);
        qotdChannel.send(`**<:tek_logo:1245109274070487141> | NEW ACTIVITY!** \n\n Greetings, <@&1227663262796218368>. For today's activity feel free to answer the following question in <#1042849970333679720> ; \n\n - __${formattedQOTD}__ \n\n teks cafe helper, \n Best bot in the world`);
    });

    async function getQOTD() {
        const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
        const question = response.data.results[0];
        const options = shuffleOptions([question.correct_answer, ...question.incorrect_answers]);
        const formattedOptions = options.map((option, index) => {
            return `**${String.fromCharCode(65 + index)}. ${he.decode(option)}**`;
        });
        return { question: he.decode(question.question), options: formattedOptions };
    }

    function formatQOTD(qotd) {
        return `${qotd.question}\n\n${qotd.options.join('\n')}`;
    }

    function shuffleOptions(options) {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        return options;
    }

}
