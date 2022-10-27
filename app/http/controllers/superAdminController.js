const Agents = require('../../models/admins/agent')

function superAdminController(){
    return{
        getUser(req,res){
            res.set({
                'Access-control-Allow-Origin': '*'
                });
            return res.render('userGeneration');
        },
        insertUser(req,res){
            const { Mail,Password,Role}  = req.body
            if(!Mail || !Password || !Role ){
                req.flash('error','All fields are required')
                req.flash('Mail',Mail)
                req.flash('Password',Password)
                req.flash('Role',Role)
                return res.redirect('/userGeneration')
            }

            const agent = new Agents({
                Mail,
                Password,
                Role
                
            })
            agent.save().then((agent) => {
            
                return res.redirect('/userGeneration')
             }).catch(err => {
                req.flash('error', 'Something went wrong')
                    return res.redirect('/userGeneration')
             })
        }
    }
}

module.exports = superAdminController