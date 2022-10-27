const mongoose = require('mongoose')
const Schema = mongoose.Schema

const complainDetailSchema = new Schema({
    Name: {type: String, required: true},
    Address: {type: String, required: true},
    Number: {type: Number},
    Complain: {type: String, required: true},
    ComplainStatus: {type:String, default:'Pending'},
    
}, {timestamps:true})


module.exports = mongoose.model('complainDetail',complainDetailSchema) 