const plasticInfo = require('../../../models/plasticInfo')
const plasticInfos = require('../../../models/plasticInfo')

function adminUpdateWasteInfoController(){
    return{
        getInfo(req,res){
            res.set({
                'Access-control-Allow-Origin': '*'
                });
            return res.render('admin/update-waste-info');
        },
        postInfo(req,res){
            const { CenterName,WasteType,WasteQty,WasteDesc}  = req.body
            if(!CenterName || !WasteType || !WasteQty || !WasteDesc){
                req.flash('error','All fields are required')
                req.flash('CenterName',CenterName)
                req.flash('WasteType',WasteType)
                req.flash('WasteQty',WasteQty)
                req.flash('WasteDesc',WasteDesc)
                return res.redirect('/update-waste-info-back')
            }

            const plasticInfo = new plasticInfos({
                CenterName,
                WasteType,
                WasteQty,
                WasteDesc
            })
            plasticInfo.save().then((plasticInfo) => {
            
                return res.redirect('/')
             }).catch(err => {
                req.flash('error', 'Something went wrong')
                    return res.redirect('/update-waste-info-back')
             })
        },update(req,res){
                plasticInfos.updateOne({_id: req.body._id},{WasteStatus: req.body.WasteStatus},(err,data)=>{
                    if(err){
                        req.flash('error', 'Something went wrong')
                        return res.redirect('update-waste-info-back')     
                    }
                    return res.render('update-waste-info-back')
                } )            
        }
    }
}

module.exports = adminUpdateWasteInfoController