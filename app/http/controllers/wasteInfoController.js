const plasticInfo = require('../../models/plasticInfo')
const plasticInfos = require('../../models/plasticInfo')

function wasteInfoController(){
    return{
        index(req,res){
            plasticInfos.find({},null,{sort: {'updatedAt': 1}}).populate('plasticInfos._id').exec((err,plasticInfos)=>{
                 if(req.xhr){
                     res.json(plasticInfos)
                 }
                 else{
                    res.render('update-waste-info-back')
                 }
                
            })
        },user(req,res){
            plasticInfos.find({},null,{sort: {'updatedAt': 1}}).populate('plasticInfos._id').exec((err,plasticInfos)=>{
                if(req.xhr){
                    res.json(plasticInfos)
                }
                else{
                   res.render('waste-info-user')
                }
               
           })
        }
    }
}

module.exports = wasteInfoController