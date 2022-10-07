function homeController(){
    return {
        index(req,res){
            res.render('home')
        },
        seller(req,res){
            res.render('seller-info')
        },
        mission(req,res){
            res.render('our-mission')
        }
    }
}

module.exports = homeController