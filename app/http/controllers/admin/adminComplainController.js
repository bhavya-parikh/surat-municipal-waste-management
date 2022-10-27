const complainDetails = require('../../../models/complainDetails')
const complainDetail = require('../../../models/complainDetails')
function adminComplainController(){
    return{
        index(req,res){
            complainDetails.find({},null,{sort: {'updatedAt': 1}}).populate('complainDetails._id').exec((err,complainDetails)=>{
                 if(req.xhr){
                     res.json(complainDetails)
                 }
                 else{
                    res.render('admin/complains')
                 }
                
            })
        
        },update(req,res){
            complainDetails.updateOne({_id: req.body._id},{ComplainStatus: req.body.ComplainStatus},(err,data)=>{
                if(err){
                    req.flash('error', 'Something went wrong')
                    return res.redirect('admin/complains')     
                }
                return res.render('admin/complains')
            } )            
        }
    }
}

module.exports = adminComplainController