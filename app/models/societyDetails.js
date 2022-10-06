const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const societyDetailSchema = new Schema({
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'societyDetails',
        required: true
        },  
    SocietyName: {type: String, required: true},
    SocietyAddress: {type: String, required: true},
    SecretaryNo: {type: Number, required: true,unique:true},
    WorkerName: {type: String, required: true},
    WorkerNo: {type: Number, required: true},
    CertificateStatus: {type:String, default:'Pending'},
    
}, {timestamps:true});


module.exports = mongoose.model('societyDetail',societyDetailSchema) 