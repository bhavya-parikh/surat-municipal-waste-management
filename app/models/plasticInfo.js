const mongoose = require('mongoose')
const Schema = mongoose.Schema

const plasticInfoSchema = new Schema({
    CenterName: {type: String, required: true},
    WasteType: {type: String, required: true},
    WasteQty: {type: String, required: true},
    WasteDesc: {type: String, required: true},
    WasteStatus: {type:String, default:'Pending'},
    
}, {timestamps:true})


module.exports = mongoose.model('plasticInfo',plasticInfoSchema) 