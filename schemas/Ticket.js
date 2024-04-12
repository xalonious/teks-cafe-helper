const mongoose = require("mongoose")

let TicketSchema = new mongoose.Schema({
    MemberID: String,
    TicketID: String,
    Type: String
})

module.exports = mongoose.model("tektickets", TicketSchema)