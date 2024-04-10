const mongoose = require("mongoose")
require("dotenv").config()
module.exports = (client) => {
    mongoose.connect(process.env.MONGOURL).then(console.log('✅  | Connected to DB'))
}