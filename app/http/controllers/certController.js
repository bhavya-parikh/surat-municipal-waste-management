const societyDetails = require('../../models/societyDetails')

function certController(){
    return{
        getCert(req,res){
                res.set({
                    'Access-control-Allow-Origin': '*'
                    });
                return res.render('citizens/request-certificate');
                },
        postCert(req,res){
            const { SocietyName,SocietyAddress,SecretaryNo,WorkerNo,WorkerName}  = req.body
            if(!SocietyName || !SocietyAddress || !SecretaryNo || !WorkerNo || !WorkerName ){
                req.flash('error','All fields are required')
                req.flash('SocietyName',SocietyName)
                req.flash('SocietyAddress',SocietyAddress)
                req.flash('SecretaryNo',SecretaryNo)
                req.flash('WorkerNo',WorkerNo)
                req.flash('WorkerName',WorkerName)
                return res.redirect('/request-certificate')
            }
            
            const societyDetail = new societyDetails({
                SocietyName,
                SocietyAddress,
                SecretaryNo,
                WorkerName,
                WorkerNo
            })
            //console.log(societyDetail)
            societyDetail.save().then((societyDetail) => {
            
                return res.redirect('/')
             }).catch(err => {
                req.flash('error', 'Something went wrong')
                    return res.redirect('/request-certificate')
             }) 
        }

    }
}

module.exports = certController