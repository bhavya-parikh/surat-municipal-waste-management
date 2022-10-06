const societyDetails = require('../../../models/societyDetails')
const societyDetail = require('../../../models/societyDetails')
function certificateController(){
    return{
        index(req,res){
            societyDetails.find({CertificateStatus:{$ne:'Approved'}},null,{sort: {'WorkerNo': -1}}).populate('societyDetails.societyId').exec((err,societyDetails)=>{
                 if(req.xhr){
                     res.json(societyDetails)
                 }
                 else{
                    res.render('agents/certificate-requests')
                 }
                
            })
        
        }
    }
}

module.exports = certificateController