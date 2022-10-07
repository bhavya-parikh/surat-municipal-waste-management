const societyDetails = require('../../../models/societyDetails')
const societyDetail = require('../../../models/societyDetails')
function certificateController(){
    return{
        index(req,res){
            societyDetails.find({CertificateStatus:{$ne:'Approved'}},null,{sort: {'createdAt': 1}}).populate('societyDetails._id').exec((err,societyDetails)=>{
                 if(req.xhr){
                     res.json(societyDetails)
                 }
                 else{
                    res.render('agents/certificate-requests')
                 }
                
            })
        
        },update(req,res){
            societyDetails.updateOne({_id: req.body._id},{CertificateStatus: req.body.CertificateStatus},(err,data)=>{
                if(err){
                    req.flash('error', 'Something went wrong')
                    return res.redirect('agents/certificate-requests')     
                }
                return res.render('agents/certificate-requests')
            } )            
        }
    }
}

module.exports = certificateController