function smcauth(req,res,next){
    if(req.isAuthenticated() && req.role === 'smcadmin'){
        return next()
    }
    return res.redirect('/')
}

module.exports = smcauth