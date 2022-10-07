const complainDetails = require('../../models/complainDetails')

function complainController(){
    return{
        getComplain(req,res){
            res.set({
                'Access-control-Allow-Origin': '*'
                });
            return res.render('citizens/complain-form');
        },
        postComplain(req,res){
            const { Name,Address,Number,Complain}  = req.body
            if(!Name || !Address || !Number || !Complain){
                req.flash('error','All fields are required')
                req.flash('Name',Name)
                req.flash('Address',Address)
                req.flash('Number',Number)
                req.flash('Complain',Complain)
                return res.redirect('/complain-form')
            }

            const complainDetail = new complainDetails({
                Name,
                Address,
                Number,
                Complain
            })
            complainDetail.save().then((complainDetail) => {
            
                return res.redirect('/')
             }).catch(err => {
                req.flash('error', 'Something went wrong')
                    return res.redirect('/complain-form')
             })
        }
    }
}

module.exports = complainController