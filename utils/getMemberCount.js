const axios = require('axios');

module.exports = async () => {
    try {
        const response = await axios.get("https://groups.roblox.com/v1/groups/14902094")
        const data = response.data;

        return data.memberCount;
    } catch(e) {
        return;
    }
}